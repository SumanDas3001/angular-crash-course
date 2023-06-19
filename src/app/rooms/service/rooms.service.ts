import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { AppConfig } from './../../AppConfig/appconfig.interface';
import { app_service_config } from './../../AppConfig/appconfig.service';
import { RoomList } from './../rooms';
import { Inject, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn:
    'root' /* providedIn: 'root' means we will get only single instance of the RoomsService */,
})
export class RoomsService {
  roomList: RoomList[] = [];

  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    shareReplay(1)
    /*
    Here we are cashing the first http get request, so we don't have to go and make another call
    If we have two different subscriptions to the same HTTP service method, it will use the first cashe request.

    getRooms$ => Here getRooms$ is a property and $ denotes it is a stream.
    */
  );

  constructor(
    @Inject(app_service_config) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log(
      this.config.apiEndPoint
    ); /* Now we are getting value from value provider */
    console.log('Rooms service initialized...');
  }

  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);
  }
}
