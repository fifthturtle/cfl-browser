import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService, URL } from './general.service';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
import { timeStamp } from 'console';
const sha1 = require('sha1');

const URLapi = environment.URLapi;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin':'http://localhost:4200',
  })
}

@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  public owners:BehaviorSubject<any> = new BehaviorSubject(null);
  public owner:BehaviorSubject<any> = new BehaviorSubject(null);
  public showLogin:BehaviorSubject<number> = new BehaviorSubject(0);
  public loginMessage:BehaviorSubject<string | any> = new BehaviorSubject(null);
  public waivers:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private socket: Socket,
  ) {
    this.http.get(`${URL}owners`)
      .subscribe(res => {
        this.owners.next(res);
      });

    if (this.cookies.check('owner_id') && this.cookies.check('password')) {
      this.login(this.cookies.get('owner_id'), this.cookies.get('password'));
    }

    this.socket.on('login-good', (data:any) => {
      this.owner.next(data);
      this.showLogin.next(0);
      this.loginMessage.next(null);
    });

    this.socket.on('password-change-complete', (data:any) => {
      this.owner.next(data.owner);
      this.showLogin.next(0);
      this.loginMessage.next(null);
    });

    this.socket.on('login-bad', (data:any) => {
      this.waivers.next(null);
      this.loginMessage.next('The username & password combo are not in the database.')
    });

    this.socket.on('password-request-emailed', () => {
      this.loginMessage.next('An email with password reset instructions was just sent.');
    });

    this.socket.on('team-waivers', (data:any) => {
      this.waivers.next(data);
      console.log('waivers', data);
    });
  }

  login(owner_id:string, password: string) {
    this.socket.emit('login', { owner_id, password });
  }

  process(owner_id:string, password:string, save:Boolean) {
    password = sha1(password)
    if (save) {
      this.cookies.set('owner_id', owner_id, 180);
      this.cookies.set('password', password, 180);
    }
    this.login(owner_id, password);
  }

  logout() {
    this.owner.next(null);
    this.showLogin.next(0);
    this.loginMessage.next(null);
    this.waivers.next(null);
    this.socket.emit('logoff');
  }

  ChangeLogin(n:number) {
    this.showLogin.next(n);
    this.loginMessage.next(null);
  }

  resetPassword(username: string) {
    this.socket.emit('lost-password', { username });
  }

  changePassword(owner_id:string, password:string, save:boolean = false) {
    password = sha1(password);
    if (save) {
      this.cookies.set('owner_id', owner_id, 180);
      this.cookies.set('password', password, 180);
    }
    this.socket.emit('update-password', { owner_id, password });
  }
}
