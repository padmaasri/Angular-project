import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { ApiserviceService } from './apiservice.service';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'https://dummyjson.com';
  // constructor(private http: HttpClient) { }



  getList(pagination: any): Observable<any> {
    let params = new HttpParams();
    for (let data in pagination) {
      if (pagination[data]) {
        params = params.append(data, pagination[data]);
        console.log(params, "params")
      }
    }
    return this.serviceService.get('/products', params)
  }
  postlogin(data): Observable<any> {
    return this.http.post(`http://localhost:3000/users`, data);
  }
  uploadImage(data): Observable<any> {
    return this.http.post(`http://localhost:3000/images`, data)
  }

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private http: HttpClient,
    private serviceService: ApiserviceService) {

  }
  socket = io('http://localhost:3000');

  public sendMessage(message) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
  shareVideo(videoData: string) {
    this.socket.emit('shareVideo', videoData);
  }
}
