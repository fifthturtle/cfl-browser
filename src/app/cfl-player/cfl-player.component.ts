import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../services/players.service';
import { CflService } from '../services/cfl.service';
import { GeneralService } from '../services/general.service';
import { combineLatest } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-cfl-player',
  templateUrl: './cfl-player.component.html',
  styleUrls: ['./cfl-player.component.less']
})
export class CflPlayerComponent implements OnInit {
  id:string|null = '';
  player:any = null;
  draft:any = null;
  draftSpot:number = 0;

  constructor(
    private route: ActivatedRoute,
    private PlayerService: PlayersService,
    private CFLService: CflService,
    private General: GeneralService
  ) { }

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.PlayerService.playersLoaded])
      .subscribe(([route, players]) => {
        this.id = route.get('id');
        if (!!players && !!this.id) this.player = this.PlayerService.players[this.id];
        this.General.setTitle("Player Profile - " + this.player.fullname);
      });

    this.CFLService.DraftLoaded
      .subscribe(x => {
        if (!x) return;
        this.draftSpot = _.findIndex(this.CFLService.Draft, (plr:any) => !!this.id && plr.id === this.id.toString());
        this.draft = this.CFLService.Draft[this.draftSpot];
      })

  }
}
