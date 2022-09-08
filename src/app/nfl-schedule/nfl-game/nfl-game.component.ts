import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nfl-game',
  templateUrl: './nfl-game.component.html',
  styleUrls: ['./nfl-game.component.less']
})
export class NflGameComponent implements OnInit {
  @Input() game:any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
