import { Component, OnInit } from '@angular/core';
import { CflService } from '../services/cfl.service';
import { GeneralService } from '../services/general.service';
import { OwnersService } from '../services/owners.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'cfl-schedule',
  templateUrl: './cfl-schedule.component.html',
  styleUrls: ['./cfl-schedule.component.less']
})
export class CflScheduleComponent implements OnInit {
  schedule:any = [];
  week:BehaviorSubject<number> = new BehaviorSubject(0);
  scrollConfig:any = {
    suppressScrollX: false,
    suppressScrollY: true,
  }

  constructor(
    private general:GeneralService,
    private CFLService: CflService,
    private OwnerService:OwnersService,
    private router: Router,
  ) { }

  Boxscore(id:number) {
    this.router.navigate(['boxscore', id]);
  }

  ngOnInit(): void {
    this.general.week
      .subscribe(res => {
        if (!this.week.value) this.week.next(res);
      });

    combineLatest([this.week, this.CFLService.ScheduleLoaded, this.OwnerService.owner])
      .subscribe(([selectedWeek, currSchedule, owner]) => {
        if (!selectedWeek) return;
        if (!!currSchedule) {
          this.schedule = _.filter(this.CFLService.Schedule, x => x.week == this.week.value);
          if (!!owner) {
            const index = _.findIndex(this.schedule, (x:any) => Number(x.team1.id) === owner.team || Number(x.team2.id) === owner.team);
            this.schedule.unshift(this.schedule.splice(index, 1).pop());
          }
        }
      })
  }

  navWeek(n:number) {
    if (!n || n > 14) return;
    this.week.next(n);
  }

}
