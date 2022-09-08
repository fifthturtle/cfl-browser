import { Component, OnInit, Input } from '@angular/core';
import { GeneralService, FLOAT } from 'src/app/services/general.service';
import { OwnersService } from 'src/app/services/owners.service';
import { MovesService } from 'src/app/services/moves.service';
import { NflService } from 'src/app/services/nfl.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'player-link',
  templateUrl: './player-link.component.html',
  styleUrls: ['./player-link.component.less']
})
export class PlayerLinkComponent implements OnInit {
  @Input() player:any = null;
  public available:boolean = false;
  public IR:boolean = false;

  constructor(
    private General: GeneralService,
    private OwnerService: OwnersService,
    private Moves: MovesService,
    private router: Router,
    private NFLService: NflService
  ) { }

  ngOnInit(): void {
    combineLatest([this.General.week, this.OwnerService.owner, this.NFLService.GamesLoaded])
      .subscribe(([week, owner, nfl]) => {
        if (!nfl) return;
        this.IR = false;
        this.available = this.checkAvailability(week, owner);
      });
  }

  checkAvailability(w:number, owner: any) {
    if (this.General.week.value < 2 || !owner) return false;
    const week:any = _.last(this.player.weeks);
    const game:any = this.NFLService.getGame(week.nflteam, week.num);
    this.IR = week.IR && week.cflteam === owner.team && (!game || game.status === 'pre_game');
    if (!game) return !week.cflteam;
    return !week.cflteam && game.status === 'pre_game';
  }

  addWaiver() {
    this.Moves.addWaiver(this.player);
  }

  activate() {
    this.Moves.activate(this.player);
  }

  Navigate() {
    this.router.navigate(['player', this.player._id]);
  }

}
