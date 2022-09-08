import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.less']
})
export class RulesComponent implements OnInit {

  constructor(
    private General: GeneralService
  ) { }

  ngOnInit(): void {
    this.General.setTitle('Rules Pages');
  }

}
