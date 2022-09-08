import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService, URL } from './general.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import * as _ from 'lodash';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class CflService {
  public ScheduleLoaded:BehaviorSubject<number> = new BehaviorSubject(0);
  public TeamsLoaded:BehaviorSubject<number> = new BehaviorSubject(0);
  public Teams:any = {};
  public DraftLoaded:BehaviorSubject<number> = new BehaviorSubject(0);
  public Draft:any = [];
  public Schedule:any = {};
  public Owners:BehaviorSubject<any> = new BehaviorSubject(null);
  public movesLoaded:BehaviorSubject<number> = new BehaviorSubject(0);
  public moves:any = [];
  public activations:any = [];
  public trades:any = [];

  initAll() {
    this.http.get(`${URL}cflschedule`)
      .subscribe(res => {
        _.each(res, (x:any) => {
          this.Schedule[x._id] = x;
        });
        this.ScheduleLoaded.next(1);
      });

    this.http.get(`${URL}cflteams`)
      .subscribe(res => {
        _.each(res, (team:any) => {
          this.Teams[team._id] = team;
        });
        this.TeamsLoaded.next(1);
      });

    this.http.get(`${URL}owners`)
      .subscribe(res => {
        this.Owners.next(res);
      });

      this.http.get(`${URL}moves`)
        .subscribe((res:any) => {
          this.movesLoaded.next(1);
          this.moves = res.moves;
          this.activations = res.activations;
          this.trades = res.trades;
        })
  }

  constructor(
    private http: HttpClient,
    private socket: Socket,
  ) {
    this.initAll();

    this.http.get(`${URL}draft`)
      .subscribe(res => {
        this.Draft = res;
        this.DraftLoaded.next(1);
      });

    this.socket.on('refresh-all', (data:any) => {
      this.TeamsLoaded.next(0);
      this.ScheduleLoaded.next(0);
      this.movesLoaded.next(0);
      this.initAll();
    })

    this.socket.on('cflschedule', (res:any) => {
      _.each(res, gm => {
        const gameId = gm.id;
        const data = gm.data;
        if (!gameId) return;
        const game = this.Schedule[gameId];
        _.each(Object.keys(data), x => {
          if (typeof data[x] === 'object') {
            _.each(Object.keys(data[x]), k => {
              game[x][k] = data[x][k];
            });
            return;
          }
          game[x] = data[x];
        });
      })
    })
  }
}
