import { Component, OnInit, Input } from '@angular/core';
import { CflService } from 'src/app/services/cfl.service';
import * as _ from 'lodash'

@Component({
  selector: 'ticker-game',
  templateUrl: './ticker-game.component.html',
  styleUrls: ['./ticker-game.component.less']
})
export class TickerGameComponent implements OnInit {
  @Input() game:any = {};
  team1:any;
  team2:any;
  constructor(
    private CFLService: CflService,
  ) { }

  ngOnInit(): void {
    this.CFLService.TeamsLoaded
      .subscribe(res => {
        if (!res) return;
        this.team1 = this.CFLService.Teams[this.game.team1.id];
        this.team2 = this.CFLService.Teams[this.game.team2.id];
      });
  }

}
