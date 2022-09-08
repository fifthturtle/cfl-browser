import { Component, OnInit, Input } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import { CflService } from 'src/app/services/cfl.service';
import { Router } from '@angular/router';

@Component({
  selector: 'player-line',
  templateUrl: './player-line.component.html',
  styleUrls: ['./player-line.component.less']
})
export class PlayerLineComponent implements OnInit {
  @Input() id:number = 0;
  @Input() team:number = 0;
  @Input() round:number = 0;
  @Input() pick:number = 0;
  public player:any = null;
  public Team:any = null;

  constructor(
    private PlayerService: PlayersService,
    private CFLService: CflService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.PlayerService.playersLoaded
      .subscribe(x => {
        if (!!x) this.player = this.PlayerService.players[this.id];
      });

    this.CFLService.TeamsLoaded
      .subscribe(x => {
        if (!!x) this.Team = this.CFLService.Teams[this.team];
      })
  }

  Nav(path:string, id:any) {
    this.router.navigate([path, id]);
  }

}
