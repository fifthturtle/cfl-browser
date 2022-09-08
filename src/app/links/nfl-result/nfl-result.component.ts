import { Component, OnInit, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { NflService } from 'src/app/services/nfl.service';
import * as _ from 'lodash';

@Component({
  selector: 'nfl-result',
  templateUrl: './nfl-result.component.html',
  styleUrls: ['./nfl-result.component.less']
})
export class NflResultComponent implements OnInit {
  @Input() id:number = 0;
  @Input() week:number = 0;
  public game:any = null;
  public result:string = "";

  constructor(
    private NFLService: NflService,
  ) { }

  ngOnInit(): void {
    combineLatest([this.NFLService.TeamsLoaded, this.NFLService.GamesLoaded])
      .subscribe(([teams, games]) => {
        if (!games) return;
        this.game = _.find(Object.values(this.NFLService.Games), (game:any) => game.week === this.week && (game.home.id === this.id || game.away.id === this.id));
        if (!this.game) return;
        const final = this.game.clock === "Final";
        if (final) {
          const [score, oppScore] = (this.game.home.id === this.id) ? [this.game.home.score, this.game.away.score] : [this.game.away.score, this.game.home.score];
          if (score > oppScore) {
            this.result = `W, ${score}-${oppScore}`;
          } else if (score < oppScore) {
            this.result = `L, ${oppScore}-${score}`;
          } else {
            this.result = `T, ${score}-${oppScore}`;
          }
        } else {
          this.result = this.game.clock;
        }
      })
  }

}
