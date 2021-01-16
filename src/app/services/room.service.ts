import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoomModel} from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/api/rooms';

  query(req: any): Observable<HttpResponse<RoomModel[]>> {
    return this.http.get<RoomModel[]>(this.url, {
      observe: 'response',
      params: req
    });
  }

  find(id: string): Observable<HttpResponse<RoomModel>> {
    return this.http.get<RoomModel>(this.url + '/' + id, {
      observe: 'response'
    });
  }
}
