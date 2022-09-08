import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'phone-nav',
  templateUrl: './phone-nav.component.html',
  styleUrls: ['./phone-nav.component.less']
})
export class PhoneNavComponent implements OnInit {

  constructor(
    public General: GeneralService,
  ) { }

  ngOnInit(): void {
  }

}
