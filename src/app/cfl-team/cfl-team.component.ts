import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../services/players.service';
import { CflService } from '../services/cfl.service';
import { OwnersService } from '../services/owners.service';
import { combineLatest } from 'rxjs';
import { GeneralService } from '../services/general.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-cfl-team',
  templateUrl: './cfl-team.component.html',
  styleUrls: ['./cfl-team.component.less']
})
export class CflTeamComponent implements OnInit {
  id:number = 0;
  roster:any = {};
  schedule:any = {};
  team:any = null;
  item:string = 'roster';
  public server:string = environment.socket;

  constructor(
    private route:ActivatedRoute,
    private PlayerService:PlayersService,
    private CFLService: CflService,
    public OwnerService: OwnersService,
    public General: GeneralService,
  ) { }

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
                return last.cflteam === this.id;
              });
    _.each(players, (x:any) => {
          const last:any = _.last(x.weeks);
          if (last.IR)
            this.roster.IR.push(x);
          else
            this.roster[x.position].push(x);
        });
  }

  setSchedule(res:any[]) {
    this.schedule = [];
    const temp = _.chain(res)
                  .filter(x => (x.team1.id === this.id) || (x.team2.id === this.id))
                  .sortBy('week')
                  .value();
    this.schedule = _.map(temp, (game:any) => {
      const ind = (game.team1.id === this.id) ? 'team1' : 'team2';
      const opp = (ind === 'team1') ? 'team2' : 'team1';
      let score = '';
      if (!!game.winner) score = (game.winner === this.id) ? "W," + game[ind].score + "-" + game[opp].score : "L," + game[opp].score + "-" + game[ind].score;
      return {
        id: game._id,
        opponent: game[opp].id,
        score,
        week: game.week,
      }
    });
  }

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.PlayerService.playersLoaded, this.CFLService.ScheduleLoaded])
      .subscribe(([route, players, schedule]) => {
        this.id = Number(route.get('id'));
        if (!!players) this.setRoster(this.PlayerService.players);
        if (!!schedule) this.setSchedule(this.CFLService.Schedule);
      });

    combineLatest([this.route.paramMap, this.CFLService.TeamsLoaded])
      .subscribe(([route, teams]) => {
        this.id = Number(route.get('id'));
        if (!!teams && !!this.id) {
          this.team = this.CFLService.Teams[this.id];
          this.General.setTitle(`Team Profile - ${this.team.team_name}`);
        }
      });
  }

  // handleFileInput(event:any) {
  //   const image = event.target.files[0];
  //   console.log('image', image);
  //   const formData: FormData = new FormData();
  //   formData.append('Image', image, image.name);
  //   formData.append('ComponentId', componentId);
  // }
  setItem(str:string) {
    this.item = str;
  }

}
