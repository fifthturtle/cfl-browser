import { Component, OnInit, Input } from '@angular/core';
import { OwnersService } from 'src/app/services/owners.service';
import { PlayersService } from 'src/app/services/players.service';
import { CflService } from 'src/app/services/cfl.service';
import { MovesService } from 'src/app/services/moves.service';
import { NflService } from 'src/app/services/nfl.service';
import { combineLatest } from 'rxjs';
import * as _ from 'lodash';

export const positionMins:any = { 
  "QB": 2,
  "RB": 5,
  "WR": 5,
  "K": 2,
  "DEF": 2
}

@Component({
  selector: 'move-float',
  templateUrl: './move-float.component.html',
  styleUrls: ['./move-float.component.less']
})
export class MoveFloatComponent implements OnInit {
  public roster:any = {};
  private owner:any = null;
  public valids:any = {};
  public player:any = null;
  public drop:number = 0;
  public puToIR:boolean = false;
  public IR:boolean = false;

  setRoster(res:any)
  {
    this.roster = {
      "QB": [],
      "RB": [],
      "WR": [],
      "K": [],
      "DEF": [],
      "IR": []
    };
    let players = Object.values(res);
    players = _.filter(players, (x:any) => {
                const last:any = _.last(x.weeks);
                return last.cflteam === this.owner.team;
              });
    _.each(players, (x:any) => {
          const last:any = _.last(x.weeks);
          if (last.IR) {
            this.roster.IR.push(x);
            return;
          }
          const game:any = this.NFL.getGame(last.nflteam, last.num);
          x.played = (!!game && game.status !== "pre_game")
          this.roster[x.position].push(x);
        });
  }

  constructor(
    private OwnerService: OwnersService,
    private CFLService: CflService,
    private PlayerService: PlayersService,
    public Moves: MovesService,
    private NFL:NflService,
  ) { }

  ngOnInit(): void {
    combineLatest([this.OwnerService.owner, this.PlayerService.playersLoaded, this.Moves.waiverPlayer])
     .subscribe(([owner, players, player]) => {
       if (!players || !owner) return;
        this.owner = owner;
        this.setRoster(this.PlayerService.players);
        this.player = player;
        this.drop = 0;
        this.puToIR = false;
        this.IR = false;
        this.getValids(player);
      });
  }

  cancel() {
    this.Moves.addWaiver(null);
  }

  getValids(player:any) {
    if (!player) {
      this.valids = [];
      return;
    }
    const pos = player.position;
    let valids = [];
    if (this.roster[pos].length === (positionMins[pos] + 2)) {
      valids.push(pos);
    } else {
      valids = _.filter(Object.keys(positionMins), (x:string) => {
        return (x === pos || this.roster[x].length > positionMins[x]);      
      });
    }
    this.valids = valids;
    console.log('valids', this.valids);
    console.log('roster', this.roster);
  }

  addWaiver() {
    const waiver:any = {
      team: this.owner.team,
      pu: this.player._id,
    }
    if (!!this.puToIR || !!this.IR) waiver.IR = true;
    if (!!this.drop) waiver.drop = this.drop;
    this.Moves.waiverClaim(waiver);
  }

  // mins = QB - 2, RB - 5, WR - 5, K - 2, DEF - 2
  // max = x + 2
  // If pos is at min, won't show up unless waiver player is same pos
  // If pos is at max and waiver player is same pos, only that pos will show up

}
