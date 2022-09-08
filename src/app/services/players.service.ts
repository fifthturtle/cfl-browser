import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService, URL } from './general.service';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private initFilters = {
    positions:0,
    cflteam: -1,
    nflteam: 0,
    nofreeagents: true,
    hideZeros: true,
    start: 1,
    end: 1
  }
  public positions = [
    { text: "All Offense", pos: ["QB", "RB", "WR"]},
    { text: "QB", pos: ["QB"]},
    { text: "RB", pos: ["RB"]},
    { text: "WR", pos: ["WR"]},
    { text: "K", pos: ["K"]},
    { text: "D", pos: ["DEF"]}
  ]
  selectedCode:BehaviorSubject<any> = new BehaviorSubject('score');
  direction:BehaviorSubject<string> = new BehaviorSubject('desc');
  public players:any = {};
  public playersLoaded:BehaviorSubject<number> = new BehaviorSubject(0);
  public playersUpdated:BehaviorSubject<any> = new BehaviorSubject(null);

  public statFilters:BehaviorSubject<any> = new BehaviorSubject(_.cloneDeep(this.initFilters));

  private initAll() {
    this.http.get(`${URL}players`)
      .subscribe(res => {
        _.each(res, (plr:any) => {
          this.players[plr._id] = plr;
        });
        this.playersLoaded.next(1);
      });
  }

  public resetFilters() {
    this.statFilters.next(_.cloneDeep(this.initFilters));
    this.direction.next('desc');
    this.selectedCode.next('score');
  }

  constructor(
    private general: GeneralService,
    private http: HttpClient,
    private socket: Socket,
  ) {
    this.initAll();

    this.general.week.subscribe(x => {
      if (!x) return;
      console.log('the current week is ', x);
      this.initFilters.end = x - 1;
      this.statFilters = new BehaviorSubject(_.cloneDeep(this.initFilters));
    })

    this.socket.on('refresh-all', (d:any) => {
      this.playersLoaded.next(0);
      this.initAll();
    });

    this.socket.on('refresh-players', (d:any) => {
      this.playersLoaded.next(0);
      this.initAll();
    })

    this.socket.on('player-stats', (res:any) => {
      const update:any[] = [];
      _.each(res, plr => {
        const id = plr.id;
        update.push(id);
        const week = plr.week;
        this.players[id].weeks[week - 1].score = plr.data.score;
        if (!!plr.data.stats) {
          _.each(Object.keys(plr.data.stats), x => {
            this.players[id].weeks[week - 1].stats[x] = plr.data.stats[x];
          })
        }
      });
      this.playersUpdated.next(update);
    });
  }
}