import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'team-cfl-schedule',
  templateUrl: './cfl-schedule.component.html',
  styleUrls: ['./cfl-schedule.component.less']
})
export class CflTeamScheduleComponent implements OnInit {
  @Input() schedule:any[] = [];
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  LoadBoxscore(g:number) {
    this.router.navigate(['boxscore', g]);
  }

}
