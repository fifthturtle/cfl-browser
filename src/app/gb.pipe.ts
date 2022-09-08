import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gb'
})
export class GbPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return "--";
    return value.toString() + ".0";
  }

}
