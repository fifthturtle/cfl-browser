import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'gameStatus'
})
export class GameStatusPipe implements PipeTransform {
  private days:string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  transform(game: any): string {
    if (game.status === 'game_closed') return "Final";
    if (game.status !== "pre_game") return game.clock;
    const date = new Date(game.time);
    const time = date.toLocaleTimeString().split(" ");
    const clock = !!time && (_.first(time))?.split(":") || [0,0,0];
    return this.days[date.getDay()] + " " + clock[0] + ":" + clock[1] + (!!time ? time[1].toLowerCase() : '')
  }

}
