import { Component, OnInit } from '@angular/core';
import { CflService } from '../services/cfl.service';
import { GeneralService } from '../services/general.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'cfl-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.less']
})
export class StandingsComponent implements OnInit {
  standings:any[] = [];
  public showFilter:boolean = false;
  public division:number = 0;
  public divisions:string[] = [
    'Overall',
    'Ocotillo',
    'Saguaro',
    'Agave',
  ];

  constructor(
    private CFLService:CflService,
    private route: ActivatedRoute,
    private router: Router,
    private General: GeneralService
  ) { }

  ngOnInit(): void {
    this.General.setTitle('Standings');
    this.route.queryParams
      .subscribe((params:any) => {
        if (!!params.query) {
          this.router.navigate(params.query.split(','));
        } else {
          this.load();
        }
      });
  }

  ChangeDivision(data:number = 0) {
    this.division = data;
    this.load();
  }

  load() {
    this.CFLService.TeamsLoaded
      .subscribe(res => {
        if (!res) return;
        let most = 0;
        this.standings = _.chain(this.CFLService.Teams)
                            .filter(x => {
                              if (!this.division) return x;
                              return x.division === this.division;
                            })
                            .orderBy(['wins', 'points', 'team_name'], ['desc', 'desc', 'asc'])
                            .map((x, index) => {
                              if (!index) most = x.wins;
                              x.gb = most - x.wins;
                              return x;
                            })
                            .value();
        console.log('this.standings', this.standings);
      })
    }

}
