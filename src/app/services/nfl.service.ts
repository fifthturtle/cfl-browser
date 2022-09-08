import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import * as _ from 'lodash';
import { URL } from './general.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class NflService {
  // public AllTeams:Observable<any> = new Observable();
  // public Schedule:Observable<any> = new Observable();
  public TeamsLoaded:BehaviorSubject<number> = new BehaviorSubject(0);
  public GamesLoaded:BehaviorSubject<number> = new BehaviorSubject(0);
  public GamesUpdated:BehaviorSubject<any> = new BehaviorSubject(null);
  public Teams:any = null; //BehaviorSubject<any> = new BehaviorSubject(null);
  public Games:any = null; //BehaviorSubject<any> = new BehaviorSubject(null);

  private initAll() {
    this.http.get(`${URL}nfl`)
      .subscribe(res => {
        this.Teams = {};
        _.each(res, (x:any) => {
          this.Teams[x._id] = x;
        })
        this.TeamsLoaded.next(1);
      });

      this.http.get(`${URL}nflschedule`)
        .subscribe(res => {
          this.Games = {};
          _.each(res, (x:any) => {
            this.Games[x._id] = x;
          })
          this.GamesLoaded.next(1);
        });
  }

  getGame(team:number, week:number) {
    if (!team || this.Teams[team].byeWeek === week) return null;
    return _.find(Object.values(this.Games), (x:any) => x.week === week && (x.away.id === team || x.home.id === team));
  }
  constructor(
    private http: HttpClient,
    private socket: Socket,
  ) {
      this.initAll();

      this.socket.on('refresh-all', (d:any) => {
        
      });
    

        this.socket.on('nflschedule', (res:any) => {
          const update:any[] = [];
          _.each(res, gm => {
            const gameId = gm.id;
            const data = gm.data;
            if (!gameId) return;
            update.push(gameId);
            const game = this.Games[gameId];
            _.each(Object.keys(data), x => {
              if (x === 'homeScore') {
                game.home.score = data[x];
                return;
              }
              if (x === 'awayScore') {
                game.away.score = data[x];
                return;
              }
              game[x] = data[x];
            });
          })
          this.GamesUpdated.next(update);
        })
  }
}
