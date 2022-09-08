import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'whole-app',
  templateUrl: './whole-app.component.html',
  styleUrls: ['./whole-app.component.less']
})
export class WholeAppComponent implements OnInit {
  public currentSize:string = '1280px';

  constructor(
    private Admin: AdminServiceService
  ) { }

  ngOnInit(): void {
    this.Admin.screenSize
      .subscribe(x => {
        console.log('screen size has changed', x);
        x = 375;
        this.currentSize = `${x}px`;
      })
  }

}
