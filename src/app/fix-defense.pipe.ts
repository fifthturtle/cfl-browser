import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixDefense'
})
export class FixDefensePipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'DEF') return "D";
    return value;
  }

}
