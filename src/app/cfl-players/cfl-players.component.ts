import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PlayersService } from '../services/players.service';
import { CflService } from '../services/cfl.service';
import { NflService } from '../services/nfl.service';
import { GeneralService } from '../services/general.service';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import * as _ from 'lodash';

const score = {
  _id: "score",
  abbr: "Pts",
  name: "Score",
  shortName: "Pts",
  pos: ["QB","RB","WR","K","DEF"],
  show: true
}

@Component({
  selector: 'app-cfl-players',
  templateUrl: './cfl-players.component.html',
  styleUrls: ['./cfl-players.component.less']
})
export class CflPlayersComponent implements OnInit {
  showFilter:boolean = false;
  showingOffense:boolean = true;
  myCode:any = false;
  week:number = 0;
  cflteams:any = [];
  nflteams:any = [];
  currStatCodes:any = [];
  allPlayers:any[] = [];
  public weeks:any = {
    start: [],
    end: []
  }

  constructor(
    private general: GeneralService,
    public PlayerService: PlayersService,
    private CFLService: CflService,
    private NFLService: NflService,
  ) { }

  filterChanged() {
    this.PlayerService.statFilters.next(this.PlayerService.statFilters.value);
    this.PlayerService.direction.next('desc');
    this.PlayerService.selectedCode.next('score');
    this.showingOffense = this.PlayerService.statFilters.value.positions <= 3;
  }

  resetFilters() {
    this.PlayerService.resetFilters();
  }

  resetFilter(key:string, val:number = 0) {
    this.PlayerService.statFilters.value[key] = val;
    this.filterChanged();
  }

  LastWeek() {
    this.PlayerService.statFilters.value.start = this.week - 1;
    this.PlayerService.statFilters.value.end = this.week - 1;
    this.filterChanged();
  }

  filterPlayers(plrs:any[], code:any, direction:any) {
    const pos = this.PlayerService.positions[this.PlayerService.statFilters.value.positions].pos;
    this.allPlayers = _.chain(plrs)
                        .filter((x:any) => {
                          let good:boolean = _.includes(pos, x.position);
                          if (!good) return false;
                          const week:any = _.last(x.weeks);
                          if (this.PlayerService.statFilters.value.cflteam >= 0) {
                            good = good && week.cflteam === this.PlayerService.statFilters.value.cflteam;
                          }
                          if (!!this.PlayerService.statFilters.value.nflteam) {
                            good = good && week.nflteam === this.PlayerService.statFilters.value.nflteam;
                          }
                          if (!!this.PlayerService.statFilters.value.nofreeagents) {
                            good = good && !!week.nflteam;
                          }
                          return good;
                        })
                        .map((x:any) => {
                          x.tally = {
                            score: 0
                          };
                          _.each(this.currStatCodes, (c:any) => x.tally[c._id] = 0);
                          _.each(x.weeks, (week:any) => {
                            if (week.num < this.PlayerService.statFilters.value.start || week.num > this.PlayerService.statFilters.value.end) return;
                            _.each(this.currStatCodes, (c:any) => x.tally[c._id] += parseInt(week.stats[c._id]) || 0);
                            x.tally.score += week.score;
                          });
                          return x;
                        })
                        .filter((x:any) => {
                          if (!this.PlayerService.statFilters.value.hideZeros) return x;
                          return !!x.tally[code];
                        })
                        .orderBy(x => x.tally[code], direction)
                        .value();
  }

  ChangeCode() {
    this.PlayerService.selectedCode.next(this.myCode);
  }

  selectCode(code:any) {
    if (code === this.PlayerService.selectedCode.value) {
      const newDirection = this.PlayerService.direction.value === 'desc' ? 'asc' : 'desc';
      this.PlayerService.direction.next(newDirection);
      return;
    }
    this.PlayerService.selectedCode.next(code);
  }

  ngOnInit(): void {
    this.general.setTitle("Statistics");
    combineLatest([this.general.week, this.PlayerService.statFilters, this.PlayerService.selectedCode, this.PlayerService.direction, this.general.statCodes, this.PlayerService.playersLoaded])
      .subscribe(([week, filters, code, direction, codes, plrs]) => {
        if (!week) return;
        this.week = week;
        this.weeks.start = _.range(1, filters.end + 1);
        this.weeks.end = _.range(filters.start, this.week);
        const pos = _.first(this.PlayerService.positions[filters.positions].pos);
        if (!!codes) {
          this.currStatCodes = _.filter(codes, x => _.includes(x.pos, pos));
        }
        if (!!plrs) this.filterPlayers(Object.values(this.PlayerService.players), code, direction);
        if (!this.myCode) this.myCode = code;
      });
    
      this.CFLService.TeamsLoaded
        .subscribe(x => {
          if (!x) return;
          this.cflteams = Object.values(this.CFLService.Teams);
        });

        this.NFLService.TeamsLoaded
          .subscribe(res => {
            if (!res) return;
            this.nflteams = Object.values(this.NFLService.Teams);
          })
  }

  // scrollDown() {
  //   this.myDiv.nativeElement.scrollTop += 150;
  // }

  // ngAfterViewInit() {
  //   console.log('div', this.myDiv);
  //   // this.myDiv.nativeElement.onwheel = (e:any) => {
  //   //   e.preventDefault();
  //   //   this.myDiv.nativeElement.innerHTML = "PEPPER";
  //   //   console.log('element', this.myDiv);
  //   // }
  // }

}
