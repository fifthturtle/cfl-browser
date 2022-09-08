import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../../services/players.service';
import { GeneralService } from 'src/app/services/general.service';
import { CflService } from 'src/app/services/cfl.service';
import { combineLatest } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'boxscore',
  templateUrl: './boxscore.component.html',
  styleUrls: ['./boxscore.component.less']
})
export class BoxscoreComponent implements OnInit {
  game:any = null;
  public team1:number = 0;
  public team2:number = 0;

  constructor(
    private CFLService: CflService,
    private route: ActivatedRoute,
    private General: GeneralService
  ) { }

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.CFLService.ScheduleLoaded])
      .subscribe(([route, schedule]) => {
        if (!schedule) return;
        const index = Number(route.get('id'));
        this.game = _.find(this.CFLService.Schedule, x => x._id === index);
        this.team1 = this.game.team1.id;
        this.team2 = this.game.team2.id;
        const title = `Week ${this.game.week} - ${this.CFLService.Teams[this.team1].team_name} vs. ${this.CFLService.Teams[this.team2].team_name}`;
        this.General.setTitle(title);
      })
  }

}
