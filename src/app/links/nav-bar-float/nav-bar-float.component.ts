import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'nav-bar-float',
  templateUrl: './nav-bar-float.component.html',
  styleUrls: ['./nav-bar-float.component.less']
})
export class NavBarFloatComponent implements OnInit {

  constructor(
    public General:GeneralService
  ) { }

  ngOnInit(): void {
  }

}
