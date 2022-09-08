import { Component, OnInit, Input } from '@angular/core';
import { OwnersService } from 'src/app/services/owners.service';
import * as _ from 'lodash';

@Component({
  selector: 'owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.less']
})
export class OwnerComponent implements OnInit {
  @Input() teamId:number = 0;
  public owners:any = null;
  public me:any = null;

  constructor(
    private Owner:OwnersService,
  ) { }
 
  ngOnInit(): void {
    this.Owner.owners
      .subscribe(x => {
        this.getOwner(x);
      })
  }

  tester() {
    console.log('owner', this);
  }

  getOwner(res:any) {
    this.owners = _.filter(res, x => x.team === this.teamId);
    this.me = this.Owner.owner.value;
  }

}
