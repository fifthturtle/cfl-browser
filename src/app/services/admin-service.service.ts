import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService, URL } from './general.service';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import {  } from 'rxjs';
import * as _ from 'lodash';
import { Socket } from 'ngx-socket-io';

export enum SIZES {
  IPHONE = 375,
  IPHONEPLUS = 414,
  TABLET = 640,
  BIGTABLET = 960,
  MONITOR = 1366,
  LARGESCREEN = 1920,
}

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  public screenSize:BehaviorSubject<number> = new BehaviorSubject(SIZES.MONITOR);
  public resize:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor( ) {
    this.resize.next({
      x: window.innerWidth,
      y: window.innerWidth,
    });
    fromEvent(window, 'resize')
                    .subscribe((rs:any) => {
                      console.log('admin resize', rs);
                      this.resize.next({
                        x: rs.target.innerWidth,
                        y: rs.target.innerHeight,
                      })
                    })
  }
}
