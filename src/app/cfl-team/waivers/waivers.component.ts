import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { OwnersService } from 'src/app/services/owners.service';
import { PlayersService } from 'src/app/services/players.service';
import { Socket } from 'ngx-socket-io';
import { combineLatest } from 'rxjs';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'waivers',
  templateUrl: './waivers.component.html',
  styleUrls: ['./waivers.component.less']
})
export class WaiversComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scroller', { static: false}) private scroller: any;
  public waivers:any = null;
  public scrollStyle:any = { 'max-height': '150px' };

  constructor(
    private Owners: OwnersService,
    private Players: PlayersService,
    private socket: Socket,
    private router: Router,
  ) { }

  ngOnInit(): void {
    combineLatest([this.Owners.waivers, this.Players.playersLoaded])
      .subscribe(([waivers, players]) => {
        if (!players) return;
        this.waivers = _.map(waivers, x => {
          x.plrPu = _.find(this.Players.players, plr => plr._id === x.pu);
          if (!!x.drop) x.plrDrop = _.find(this.Players.players, plr => plr._id === x.drop);
          return x;
        });
        this.updateScrollHeight();
      });
  }

  ngOnDestroy(): void {
    if (!this.Owners.owner.value) return;
    this.socket.emit('refresh-waivers', { team: this.Owners.owner.value.team });
  }

  ngAfterViewInit(): void {
    this.updateScrollHeight();
  }

  updateScrollHeight() {
    console.log('updating', _.cloneDeep(this.scroller));
    if (!this.scroller) return;
    this.scrollStyle['max-height'] = `${this.scroller.nativeElement.clientHeight || 1525}px`;
    console.log('did not return!', this, this.scroller.nativeElement.clientHeight);
    console.log('updated - try again', _.cloneDeep(this.scroller));
  }

  fixWaivers(changes:any[] = []) {
    _.each(this.waivers, (waiver, index) => {
      if (index + 1 !== waiver.order) {
        changes.push({
          _id: waiver.time,
          change: {
            type: 'move-waiver',
            from: waiver.order,
            to: index + 1
          }
        });
        waiver.order = index + 1;
      }
    }); 
    this.socket.emit('update-waivers', { team: this.Owners.owner.value.team, changes });
  }

  moveWaiver(index:number, direction:number) {
    this.waivers.splice(index + direction, 0, this.waivers.splice(index, 1).shift());
    this.fixWaivers();
  }

  deleteWaiver(index:number) {
    const del = (this.waivers.splice(index, 1)).pop();
    const changes = [
      {
        _id: del.time,
        change: {
          type: 'delete-waiver'
        }
      }
    ]
    this.fixWaivers(changes);
  }

  Navigate(path:any, id:any) {
    this.router.navigate([path, id]);
  }

}
