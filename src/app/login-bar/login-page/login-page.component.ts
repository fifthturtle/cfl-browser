import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../../services/owners.service';
import { GeneralService, FLOAT } from 'src/app/services/general.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {
  owner:any = null;
  username:string = '';
  password:string = '';
  autoLogin:boolean = true;
  float = FLOAT;

  constructor(
    public owners: OwnersService,
    public General: GeneralService,
  ) { }

  ngOnInit(): void {
    this.owners.owner
      .subscribe((x:any) => this.owner = x);
  }

  login() {
    this.owners.process(this.username, this.password, this.autoLogin);
    this.General.showFloat(FLOAT.NONE);
  }

  logout() {
    this.owners.logout();
    this.General.showFloat(FLOAT.NONE);
  }

  resetPassword() {
    if (!this.username) {
      this.owners.loginMessage.next("Enter your username in the box and click 'Forgot My Password' again");
      return;
    }
    this.owners.resetPassword(this.username);
  }

}
