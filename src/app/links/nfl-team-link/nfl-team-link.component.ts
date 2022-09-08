import { Component, OnInit, Input } from '@angular/core';
import { NflService } from 'src/app/services/nfl.service';
import * as _ from 'lodash';

@Component({
  selector: 'nfl-team-link',
  templateUrl: './nfl-team-link.component.html',
  styleUrls: ['./nfl-team-link.component.less']
})
export class NflTeamLinkComponent implements OnInit {
  @Input() id:Number = 0;
  @Input() display:string = 'abbr';
  @Input() pic:boolean = false;
  public team:any = null;
  public teamDisplay:string = '';
  public image:string = '';

  constructor(
    private NFLService: NflService,
  ) { }

  ngOnInit(): void {
    this.NFLService.TeamsLoaded
      .subscribe(res => {
        if (!res) return;
        this.team = _.find(Object.values(this.NFLService.Teams), (x:any) => Number(this.id) === Number(x._id))
        this.teamDisplay = this.team && this.team[this.display];
        this.image = this.team && this.team.image;
      })
  }

}
