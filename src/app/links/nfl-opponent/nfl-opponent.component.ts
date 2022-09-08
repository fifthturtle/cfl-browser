import { Component, Input, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { NflService } from 'src/app/services/nfl.service';
import * as _ from 'lodash';

@Component({
  selector: 'nfl-opponent',
  templateUrl: './nfl-opponent.component.html',
  styleUrls: ['./nfl-opponent.component.less']
})
export class NflOpponentComponent implements OnInit {
  @Input() id:number = 0;
  @Input() week:number = 0;
  public game:any = null;
  public opponent:string = '';

  constructor(
    private NFLService: NflService,
  ) { }

  ngOnInit(): void {
    combineLatest([this.NFLService.TeamsLoaded, this.NFLService.GamesLoaded])
      .subscribe(([teams, games]) => {
        if (!games || !teams) return;
        this.game = _.find(Object.values(this.NFLService.Games), (game:any) => game.week === this.week && (game.home.id === this.id || game.away.id === this.id));
        if (!!this.game) {
          const away = this.game.away.id === this.id;
          const oppID = (away) ? this.game.home.id : this.game.away.id;
          const extra = away && "@" || '';
          const opp:any = _.find(Object.values(this.NFLService.Teams), (x:any) => x._id === oppID);
          this.opponent = `${extra}${opp.abbr}`

        }
      })
  }

}
