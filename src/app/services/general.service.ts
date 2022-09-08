import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { Title } from '@angular/platform-browser';
export const URL:string = environment.URL;

export enum FLOAT {
  "NONE" = 0,
  "LOGIN" = 1,
  "MOVES" = 2,
  "ACTIVATION" = 3
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public statCodes:BehaviorSubject<any> = new BehaviorSubject(null);
  public week:BehaviorSubject<number> = new BehaviorSubject(0);
  public showNavBar:BehaviorSubject<number> = new BehaviorSubject(0);
  public floatWindow:BehaviorSubject<number> = new BehaviorSubject(FLOAT.NONE);
  private conn:string = "DefaultEndpointsProtocol=https;AccountName=mrlpdfdata;AccountKey=p0vcFSc7XvgJOhIJLM6ZDc7oXzyxAWv2FDfi8iKETGzTZUdJSCPp5QhiMqjGRrNqbScfYARfOQJsgawLAH6Fyw==;EndpointSuffix=core.windows.net";

  private initAll() {
    this.http.get(`${URL}week`)
      .subscribe((res:any) => {
        this.week.next(Number(res.week));
      });
  }



  showFloat(n:number) {
    this.floatWindow.next(n);
  }

  setTitle(s:string) {
    this.title.setTitle(s);
  }

  turnOffMenu() {
    this.showNavBar.next(0);
  }

  toggleNavBar() {
    this.showNavBar.next(Math.abs(this.showNavBar.value - 1));
  }
  
  constructor(
    private http: HttpClient,
    private socket: Socket,
    private title: Title,
  ) {
    this.initAll();

    this.socket.on('refresh-all', (d:any) => {
      this.initAll();
    });
    
    this.http.get(`${URL}statCodes`)
      .subscribe(res => {
        this.statCodes.next(res);
      });

  }
}
