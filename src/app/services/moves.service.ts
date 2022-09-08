import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService, FLOAT } from './general.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import * as _ from 'lodash';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MovesService {
  public waiverPlayer:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private socket: Socket,
    private General: GeneralService
  ) { }

  waiverClaim(waiver:any) {
    this.socket.emit('waiver-claim', waiver);
    this.addWaiver(null);
  }

  addWaiver(player:any) {
    this.waiverPlayer.next(player);
    this.General.showFloat(!!player ? FLOAT.MOVES : FLOAT.NONE);
  }

  activation(data:any) {
    this.socket.emit('activation-claim', data);
    console.log('activation', data);
    this.activate(null);
  }

  activate(player:any) {
    this.waiverPlayer.next(player);
    this.General.showFloat(!!player ? FLOAT.ACTIVATION : FLOAT.NONE);
  }
}
