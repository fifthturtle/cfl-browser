import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { combineLatest } from 'rxjs';
import { CflService } from 'src/app/services/cfl.service';
import { PlayersService } from 'src/app/services/players.service';
import { NflService } from 'src/app/services/nfl.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'game-boxscore',
  templateUrl: './game-boxscore.component.html',
  styleUrls: ['./game-boxscore.component.less']
})
export class GameBoxscoreComponent implements OnInit {
  private empty:any = {
    "QB": [],
    "RB": [],
    "WR": [],
    "K": [],
    "DEF": []
  }
  public maxes:any = {
    "QB": 2,
    "RB": 3,
    "WR": 3,
    "K": 1,
    "DEF": 1,
  }
  @Input() teamKey:string = '';
  public week:number = 0;
  public team:any = null;
  public players:any = _.cloneDeep(this.empty);
  public game:any = null;
  public weekStarted:boolean = false;
  private gameId:number = 0;
  private teamId:number = 0;

  constructor(
    private CFLService: CflService,
    private PlayerService: PlayersService,
    private NFLService: NflService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  setRoster() {
    const players = _.cloneDeep(this.empty);
    _.each(Object.values(this.PlayerService.players), (player:any) => {
      const week = player.weeks[this.week - 1];
      if (week.cflteam === this.teamId && !week.IR) {
        player.gameScore = week.score;
        players[player.position].push(player);
      }
    });
    this.players = players;
  }

  ngOnInit(): void {
    this.PlayerService.playersUpdated
      .subscribe(res => {
        if (!res) return;
        const pos = Object.keys(this.empty);
        _.each(pos, p => {
          _.each(this.players[p], plr => {
            if (_.includes(res, plr._id)) {
              if (plr.weeks[this.week - 1].score !== plr.gameScore) plr.gameScore = plr.weeks[this.week - 1].score;
            }
          });
        });
      });


    combineLatest([this.route.paramMap, this.CFLService.TeamsLoaded, this.PlayerService.playersLoaded])
      .subscribe(([route, teams, players]) => {
        if (!teams || !players) return;
        this.gameId = Number(route.get('id'));
        this.game = this.CFLService.Schedule[this.gameId];
        this.week = this.game.week;
        this.teamId = this.game[this.teamKey].id;
        this.team = this.CFLService.Teams[this.teamId];
        const weekGames = _.filter(Object.values(this.NFLService.Games), (x:any) => x.week === this.week)
        this.weekStarted = !!((_.filter(weekGames, (x:any) => x.status !== 'pre_game')).length);
        this.setRoster();
      })
  }

  navigate(path:string, id:number) {
    this.router.navigate([path, id]);
  }
}