import { Component, OnInit } from '@angular/core';
import { GeneralService, FLOAT } from '../services/general.service';

@Component({
  selector: 'floater',
  templateUrl: './login-floater.component.html',
  styleUrls: ['./login-floater.component.less']
})
export class LoginFloaterComponent implements OnInit {
  public float = FLOAT;
  
  constructor(
    public General: GeneralService,
  ) { }

  ngOnInit(): void {
  }

}
