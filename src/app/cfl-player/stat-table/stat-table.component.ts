import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import * as _ from 'lodash';

const LINE_HEIGHT = 20;

@Component({
  selector: 'stat-table',
  templateUrl: './stat-table.component.html',
  styleUrls: ['./stat-table.component.less']
})
export class StatTableComponent implements OnInit {
  @Input() stats:any[] = [];
  @Input() position:string = "";
  @Input() totals:any[] = [];
  @Input() score:number = 0;

  public codes:any = null;
  public is_offense:boolean = false;
  public scrollStyle: any = {};

  constructor(
    private General: GeneralService,
  ) { }

  ngOnInit(): void {
    this.scrollStyle = {
      'max-height': this.stats.length * LINE_HEIGHT + "px"
    }
    this.is_offense = !(this.position === "K" || this.position === "DEF");
    this.General.statCodes
      .subscribe(codes => {
        if (!codes) return;
        this.codes = _.filter(codes, code => _.includes(code.pos, this.position));
      });
  }

}
