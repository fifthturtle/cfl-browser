import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'sortTeam'
})
export class SortTeamPipe implements PipeTransform {

  transform(players: any): any {
    return _.orderBy(players, ['gameScore', 'lastname'], ['desc', 'asc']);
  }
}
