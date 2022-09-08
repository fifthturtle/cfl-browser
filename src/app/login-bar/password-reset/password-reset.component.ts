import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { OwnersService } from 'src/app/services/owners.service';
import * as _ from 'lodash';

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.less']
})

export class PasswordResetComponent implements OnInit {
  public msg:string = "";
  public showForm:boolean = false;
  public hide:any = {
    new: true,
    confirm:true
  }
  public password:any = {
    new: '',
    confirm: ''
  }
  public username:string = "";
  public notValid:boolean = true;
  public autoLogin:boolean = true;
  private owner:string = "";

  constructor(
    private socket: Socket,
    private Route: ActivatedRoute,
    private Owners: OwnersService,
  ) { }

  changePassword() {
    if (this.notValid) return;
    this.Owners.changePassword(this.username, this.password.new, this.autoLogin);
  }

  checkValidity() {
    this.notValid = !(this.username === this.owner && this.password.new === this.password.confirm && this.password.new.length >= 8);
  }

  ngOnInit(): void {
    this.socket.on('password-change-complete', (data:any) => {
      this.showForm = false;
      this.password.new = "";
      this.password.confirm = "";
      this.username = "";
      this.owner = "";
      this.notValid = true;
      this.msg = "Your password has been updated and you have been logged into the site.";
    })
    this.socket.on('password-reset-info', (data:any) => {
      if (!data.owner) {
        this.msg = "The supplied reset key is inavlid.";
        return;
      }
      
      if (!!data.expired) {
        this.msg = "The supplied reset key has expired. You will need to request another one."
        return;
      }

      this.owner = data.owner;
      this.msg = "Please enter your new password below."
      this.showForm = true;
    });


    this.Route.paramMap
      .subscribe(route => {
        const key = route.get('key');
        console.log('sending password reset key', { key });
        this.socket.emit('password-reset-key', { key });
      });

  }

}
