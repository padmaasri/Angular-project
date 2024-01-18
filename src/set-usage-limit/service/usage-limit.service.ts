import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsageLimitService {

  constructor(private apiService: ApiService) { }

  update(body): Observable<any> {
    return this.apiService.post(`master-settings/mobileUsageLimit`, body);
  }
}
