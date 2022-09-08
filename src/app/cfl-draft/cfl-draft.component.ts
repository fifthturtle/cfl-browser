import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CflService } from '../services/cfl.service';
import { NflService } from '../services/nfl.service';
import { PlayersService } from '../services/players.service';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import * as _ from 'lodash';

@Component({
  selector: 'cfl-draft',
  templateUrl: './cfl-draft.component.html',
  styleUrls: ['./cfl-draft.component.less']
})
export class CflDraftComponent implements OnInit {
  public draft:any = [];
  public rounds:number[] = Array.from({length: 18}, (_, i) => i + 1);
  public cflteams:any = [];
  public nflteams:any = [];
  public positions:any = ["QB", "RB", "WR", "K", "DEF"];
  private initFilters = {
    cflteam: 0,
    round: 0,
    nflteam: 0,
    position: 0,
  }

  filters:BehaviorSubject<any> = new BehaviorSubject(_.clone(this.initFilters));

  constructor(
    private CFLService: CflService,
    private PlayerService: PlayersService,
    private NFLService: NflService,
    private router: Router,
    private General: GeneralService
  ) { }

  filterChanged() {
    this.filters.next(this.filters.value);
  }

  resetFilters() {
    this.filters.next(_.clone(this.initFilters));
  }

  ngOnInit(): void {
    this.General.setTitle('Draft Recap');
    combineLatest([this.filters, this.CFLService.DraftLoaded])
      .subscribe(([filters, draft]) => {
        if (!draft) return;
        this.draft = _.map(this.CFLService.Draft, plr => {
          let show:boolean = true;
          if (!!filters.cflteam) show = show && this.PlayerService.players[plr.id].weeks[0].cflteam === filters.cflteam;
          if (!!filters.nflteam) show = show && this.PlayerService.players[plr.id].weeks[0].nflteam === filters.nflteam;
          if (!!filters.position) show = show && this.PlayerService.players[plr.id].position === filters.position;
          if (!!filters.round) show = show && plr.round === filters.round;
          plr.show = show;
          return plr;
        })
      });
    
    this.CFLService.TeamsLoaded
      .subscribe(x => {
        if (!x) return;
        this.cflteams = Object.values(this.CFLService.Teams);
      });

    this.NFLService.TeamsLoaded
      .subscribe(res => {
        if (!res) return;
        this.nflteams = Object.values(this.NFLService.Teams);
      })
  }

  Nav(path:string, id:any) {
    this.router.navigate([path, id]);
  }

}
