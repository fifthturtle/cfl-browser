import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CflService } from 'src/app/services/cfl.service';
import { Router } from "@angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'cfl-team-link',
  templateUrl: './cfl-team-link.component.html',
  styleUrls: ['./cfl-team-link.component.less']
})
export class CflTeamLinkComponent implements OnInit, OnChanges {
  @Input() id:number = 0;
  @Input() fullname:boolean = false;
  team:any = null;

  constructor(
    private CFLService: CflService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.id) return;
    this.CFLService.TeamsLoaded
      .subscribe(res => {
        if (!res) return;
        this.team = this.CFLService.Teams[this.id];
      })
  }

  ngOnChanges() {
    this.team = this.CFLService.Teams[this.id];
  }

  navigate() {
    this.router.navigate(['team', this.id])
  }

}
