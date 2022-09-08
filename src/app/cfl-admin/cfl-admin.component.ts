import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../services/owners.service';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-cfl-admin',
  templateUrl: './cfl-admin.component.html',
  styleUrls: ['./cfl-admin.component.less']
})
export class CflAdminComponent implements OnInit {
  public owner:any = null;
  public allowMoves:boolean = false;

  constructor(
    private socket: Socket,
    private router: Router,
    private Owners: OwnersService,
    private General: GeneralService
  ) { }

  emit(cmd:string) {
    this.socket.emit(cmd, this.owner);
  }

  ngOnInit(): void {
    this.General.setTitle("Administration Page");
    this.Owners.owner
      .subscribe(res => {
        if (!res || !res.admin) {
          this.router.navigate(['/']);
          return;
        }
        this.owner = res;
      })
  }

}
