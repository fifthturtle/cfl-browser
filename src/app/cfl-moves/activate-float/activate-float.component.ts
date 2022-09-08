import { Component, OnInit, Input } from '@angular/core';
import { positionMins } from '../move-float/move-float.component';
import { OwnersService } from 'src/app/services/owners.service';
import { PlayersService } from 'src/app/services/players.service';
import { CflService } from 'src/app/services/cfl.service';
import { MovesService } from 'src/app/services/moves.service';
import { NflService } from 'src/app/services/nfl.service';
import { combineLatest } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'activate-float',
  templateUrl: './activate-float.component.html',
  styleUrls: ['./activate-float.component.less']
})
export class ActivateFloatComponent implements OnInit {
  public roster:any = {};
  private owner:any = null;
  public valids:any = {};
  public player:any = null;
  public drop:number = 0;
  public actAndDrop:boolean = false;
  public dropToIR:boolean = false;
  
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
          if (!!game && game.status !== "pre_game") return;
          this.roster[x.position].push(x);
        });
  }


  constructor(
    private OwnerService: OwnersService,
    private CFLService: CflService,
    private PlayerService: PlayersService,
    public Moves: MovesService,
    private NFL: NflService,
  ) { }

  ngOnInit(): void {
    combineLatest([this.OwnerService.owner, this.PlayerService.playersLoaded, this.Moves.waiverPlayer])
     .subscribe(([owner, players, player]) => {
       if (!players || !owner) return;
        this.owner = owner;
        this.setRoster(this.PlayerService.players);
        this.player = player;
        this.drop = 0;
        this.actAndDrop = false;
        this.dropToIR = false;
        if (!!player) {
          const week:any = _.last(this.player.weeks);
          if (!week.IR || week.cflteam !== this.owner.team) {
            this.cancel();
            return;
          }
        }
        this.getValids(player);
      });
  }

  cancel() {
    this.Moves.activate(null);
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
  }

  activate() {
    const activation:any = {
      team: this.owner.team,
      pu: this.player._id,
    }
    if (!!this.drop) {
      activation.drop = this.drop;
      activation.dropToIR = this.dropToIR;
    }
    this.Moves.activation(activation);
  }

}
