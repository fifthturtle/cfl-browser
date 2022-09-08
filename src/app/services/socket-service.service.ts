import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  constructor(
    private socket: Socket,
  ) {
    
   }
}
