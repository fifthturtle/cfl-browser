import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { combineLatest } from 'rxjs';
import { CflService } from 'src/app/services/cfl.service';
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'game-boxscore-header',
  templateUrl: './game-boxscore-header.component.html',
  styleUrls: ['./game-boxscore-header.component.less']
})
export class GameBoxscoreHeaderComponent implements OnInit, OnChanges {
  @Input() teamKey:string = '';
  @Input() id:number = 0;
  @Input() score:number = 0;
  public name:string = '';

  constructor(
    private CFLService: CflService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.CFLService.TeamsLoaded])
      .subscribe(([route, teams]) => {
        if (!teams) return;
        this.name = (this.CFLService.Teams[this.id]).team_name;
      })
  }

  ngOnChanges():void {
    if (!this.id) return;
    const team = this.CFLService.Teams[this.id];
    this.name = team && team.team_name;
  }

}
