import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'winPct'
})
export class WinPctPipe implements PipeTransform {

  transform(value: number): any {
    if (value <= 0) return ".000";
    if (value >= 1) return "1.000";
    let s:any = (Math.round(value * 1000)).toString();
    //let s:any = _.last(value.toString().split("."));
    while (s.toString().length < 3) s = `${s}0`
    return `.${s}`;
  }

}
