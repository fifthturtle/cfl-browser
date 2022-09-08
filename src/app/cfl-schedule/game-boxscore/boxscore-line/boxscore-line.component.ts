import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { combineLatest, Observable, of as ObservableOf, BehaviorSubject } from 'rxjs';
import { NflService } from 'src/app/services/nfl.service';
import { GeneralService } from 'src/app/services/general.service';
import { PlayersService } from 'src/app/services/players.service';

function checkForS(n:number, s:string):string {
  let ret:string = `${n} ${s}`;
  const last = _.last(s) === 's';
  if (n !== 1 || !last) return ret;
  return ret.slice(0, -1);
}

@Component({
  selector: 'boxscore-line',
  templateUrl: './boxscore-line.component.html',
  styleUrls: ['./boxscore-line.component.less']
})
export class BoxscoreLineComponent implements OnInit, OnChanges {
  @Input() player:any = null;
  @Input() week:number = 0;
  public line:string = '';
  public weekStarted:boolean = false;
  private team:any = null;
  private game:any = null;
  private codes:any = null;

  constructor(
    private NFLService: NflService,
    private general: GeneralService,
    private PlayerService: PlayersService,
  ) { }

  processLine(game:any) {
    if (!this.team) {
      this.line = "This guy is not on a team!";
      return;
    }

    if (this.team.byeWeek === this.week) {
      this.line = "Team was on a bye!";
      return;
    }

    if (!game) {
      this.line = "Not sure what is going on here";
      return;
    }

    const away = game.away.id === this.team._id;
    const opp = `${away && '@' || 'vs. '}${this.NFLService.Teams[away ? game.home.id : game.away.id].abbr}`;

    if (game.status === 'pre_game') {
      this.line = opp + " - " + game.clock;
      return;
    }

    const stats = this.player.weeks[this.week - 1].stats;
    const codes = _.filter(this.codes, x => x.show);
    let line:string[] = [];
    _.each(codes, code => {
      const stat = stats[code._id];
      if (!!stat) {
        line.push(checkForS(stat, code.shortName));
      }
    });

    if (!line.length) {
      this.line = (!!stats[1]) ? "No Stats" : this.game.status === 'game_closed' ? "Did Not Play" : "Has Not Played";
    } else {
      this.line = line.join(', ');
    }
  }

  ngOnChanges(changes:any): void {
    if (!!changes.week) {
      this.initGame();
    }
  }

  initGame() {
    const weekGames = _.filter(Object.values(this.NFLService.Games), (x:any) => x.week === this.week);
    this.team = this.NFLService.Teams[this.player.weeks[this.week-1].nflteam];
    this.game = _.find(weekGames, (x:any) => {
      return x.home.id === this.team._id || x.away.id === this.team._id;
    });
    this.processLine(this.game);
  }

  ngOnInit(): void {
    this.PlayerService.playersUpdated
      .subscribe(res => {
        if (!res || !this.player) return;
        if (_.includes(res, this.player._id)) this.processLine(this.game);        
      });

    this.NFLService.GamesUpdated
      .subscribe(res => {
        if (!res || !this.game) return;
        if (_.includes(res, this.game._id)) this.processLine(this.game);
      })

    this.general.statCodes
      .subscribe(res => {
        this.codes = res;
      })
    combineLatest([this.NFLService.TeamsLoaded, this.NFLService.GamesLoaded])
        .subscribe(([teams, games]) => {
          if (!teams || !games) return;
          this.initGame();
        });
  }
}
