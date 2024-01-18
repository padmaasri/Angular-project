import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  // getimage(data): Observable<any> {
  //   return this.http.post(`https://api.openai.com/v1/images/generations`, data)
  // }

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
  // socket = io('http://localhost:3000');

  // public sendMessage(message) {
  //   this.socket.emit('message', message);
  // }

  // public getNewMessage = () => {
  //   this.socket.on('message', (message) => {
  //     this.message$.next(message);
  //   });

  //   return this.message$.asObservable();
  // };
  // shareVideo(videoData: string) {
  //   this.socket.emit('shareVideo', videoData);
  // }

  private apiKey = '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';


  generateImage(data) {
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`
    };
    data = {
      prompt: data,
      n: 2,
      size: "512x512"
    };

    return this.http.post(`https://api.openai.com/v1/images/generations`, data, { headers });
  }

  // generateaudio(audioFile: File, model: string) {
  //   console.log("dhfghgfhg")
  //   const headers = {
  //     'Authorization': `Bearer ${this.apiKey}`
  //   };

  //   const formData = new FormData();
  //   formData.append('file', audioFile, audioFile.name);
  //   formData.append('model', model);
  //   return this.http.post(`https://api.openai.com/v1/audio/transcriptions`, formData, { headers });

  generateAudio(file: File) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
    });

    const data = new FormData();
    data.append('model', 'whisper-1');
    data.append('file', file);
    console.log(data, "data")

    return this.http.post(`https://api.openai.com/v1/audio/transcriptions`, data, { headers });
  }

  createBlankPresentation(title: string): Observable<any> {
    const presentation = {
      title: title,
    };


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
    });

    // Make an HTTP POST request to create the presentation
    return this.http.post(``, presentation, { headers });
  }
}
