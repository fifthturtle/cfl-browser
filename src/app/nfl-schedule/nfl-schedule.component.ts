import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { GeneralService } from '../services/general.service';
import { NflService } from '../services/nfl.service';
import * as _ from 'lodash';

@Component({
  selector: 'nfl-schedule',
  templateUrl: './nfl-schedule.component.html',
  styleUrls: ['./nfl-schedule.component.less']
})
export class NflScheduleComponent implements OnInit {
  public week:number = 0;
  public schedule:any = null;
  public byes:any = null;
  public weeks:number[] = Array.from({length: 18}, (_, i) => i + 1);

  constructor(
    private General: GeneralService,
    private NFLService: NflService
  ) { }

  ngOnInit(): void {
    combineLatest([this.NFLService.GamesLoaded, this.NFLService.TeamsLoaded, this.General.week])
      .subscribe(([games, teams, week]) => {
        if (!games || !teams) return;
        this.week = week;
        this.getSchedule();
      });
  }

  getSchedule() {
    this.schedule = _.chain(Object.values(this.NFLService.Games))
                      .filter((x:any) => x.week === this.week)
                      .orderBy(['time'])
                      .value();
    let jets = false;
    this.byes = _.chain(Object.values(this.NFLService.Teams))
                  .filter((x:any) => {
                    return x.byeWeek === this.week
                  })
                  .filter((x:any) => {
                    if (x._id === 25) {
                      jets = true;
                      return false;
                    }
                    return true;
                  })
                  .map((x:any) => x._id)
                  .value()
    if (!!jets) this.byes.push(25);
  }

  weekChanged() {
   this.getSchedule();
  }

}
