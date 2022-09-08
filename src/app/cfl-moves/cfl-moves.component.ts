import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { combineLatest } from 'rxjs';
import { CflService } from '../services/cfl.service';
import { GeneralService } from '../services/general.service';
import { PlayersService } from '../services/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cfl-moves',
  templateUrl: './cfl-moves.component.html',
  styleUrls: ['./cfl-moves.component.less']
})
export class CflMovesComponent implements OnInit {
  public week: number = 0;
  public moves:any = [];
  public activations:any = [];
  public trades:any = null;
  public round:any = 1;
  public totalRounds:number = 0;
  public showFilter:boolean = false;
  public currentRound:any = [];

  constructor(
    private General: GeneralService,
    private CFLService: CflService,
    private Players: PlayersService,
    private router: Router
  ) { }

  Navigate(path:any, id:any) {
    this.router.navigate([path, id]);
  }

  ngOnInit(): void {
    this.General.setTitle("Moves");
    combineLatest([this.General.week, this.CFLService.TeamsLoaded, this.CFLService.movesLoaded, this.Players.playersLoaded])
      .subscribe(([week, teams, moves, players]) => {
        if (!teams || !moves || !players) return;
        this.week = week;
        this.moves = [];
        const _moves = this.CFLService.moves[this.week - 1];
        _.each(_moves, round => {
          const _round = _.map(round, x => {
            if (!x.pu) return x;
            x.plrPu = this.Players.players[x.pu];
            if (!!x.drop) x.plrDrop = this.Players.players[x.drop];
            return x;
          });
          this.moves.push(_round);
        });
        const _activations = this.CFLService.activations[this.week - 1]
        this.activations = _.map(_activations, (x:any) => {
                                      x.plrPu = this.Players.players[x.pu];
                                      if (!!x.drop) {
                                        x.plrDrop = this.Players.players[x.drop];
                                        x.IR = !!x.dropToIR;
                                      } else {
                                        x.IR = false;
                                      }
                                      return x;
                                  });
        const _trades = this.CFLService.trades[this.week - 1];
        if (!!_trades) {
          this.trades = _.map(_trades, (x:any) => {
            x.team1players = _.map(x.team1.players, plr => this.Players.players[plr]);
            x.team2players = _.map(x.team2.players, plr => this.Players.players[plr]);
            return x;
          })
        }
        
        this.totalRounds = this.moves.length;
        this.round = this.moves.length || 'activations';
        this.currentRound = !!this.moves.length ? this.moves[this.round -1] : this.activations;
      });
  }
  
  changeRound(data:any) {
    this.round = data;
    if (data === 'activations') {
      this.currentRound = this.activations;
      return;
    }
    if (data === 'trades') {
      this.currentRound = this.trades;
      return;
    }
    this.currentRound = this.moves[this.round - 1]
  }
}
