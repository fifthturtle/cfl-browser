import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../services/owners.service';
import { GeneralService, FLOAT } from '../services/general.service';

@Component({
  selector: 'login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.less']
})
export class LoginBarComponent implements OnInit {
  owner:any = null;
  username:string = '';
  password:string = '';
  autoLogin:boolean = false;
  tooltipMessage:string = '';

  constructor(
    private owners: OwnersService,
    private General: GeneralService
  ) { }

  ngOnInit(): void {
    this.owners.owner
      .subscribe(x => {
        this.tooltipMessage = (!!x) ? `Logged in as ${x.firstname} ${x.lastname}` : 'Click to Log In';
        this.owner = x;
      });
  }

  showLogin(n: number) {
    // this.owners.ChangeLogin(n);
    this.General.showFloat(FLOAT.LOGIN);
  }
}
