import { Component, OnInit } from '@angular/core';
import { OwnersService } from 'src/app/services/owners.service';
import { GeneralService } from 'src/app/services/general.service';
import { AdminServiceService, SIZES } from 'src/app/services/admin-service.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {
  owner:any = null;
  sizes:any = SIZES;
  public size: any = { x: 0, y: 0 };

  constructor(
    private owners:OwnersService,
    private General: GeneralService,
    private Admin: AdminServiceService,
  ) { }

  turnOffMenu() {
    this.General.turnOffMenu();
  }

  changes(key: any) {
    this.Admin.screenSize.next(key);
  }

  ngOnInit(): void {
    this.Admin.resize
      .subscribe(x => {
        this.size = x
      });
    this.owners.owner
      .subscribe(x => {
        this.owner = x;
      })
  }

}
