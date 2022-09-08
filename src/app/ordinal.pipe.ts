import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Ordinal'
})
export class OrdinalPipe implements PipeTransform {

  transform(value: number): string {
    return `${value}${this.nth(value)}`;
  }

  nth(d:number):string {
    if (d > 3 && d < 21) return 'th'; 
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }

}
