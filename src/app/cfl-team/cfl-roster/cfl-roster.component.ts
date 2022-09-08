import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cfl-roster',
  templateUrl: './cfl-roster.component.html',
  styleUrls: ['./cfl-roster.component.less']
})
export class CflRosterComponent implements OnInit {
  @Input() roster:any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  playerStats(id:any) {
    this.router.navigate(['player', id]);
  }
}
