import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environment.ts/environment';




@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  token: any;
  constructor(
    private http: HttpClient,
  ) {
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiURL}${path}`, { params });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiURL}${path}`,
      body
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiURL}${path}`,
      body
    );
  }


  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiURL}${path}`
    );
  }

}