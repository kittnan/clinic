import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LineHttpService {
  URL: any = environment.URL;
  constructor(private http: HttpClient) {}

  sendQR(data: any): Observable<any> {
    return this.http.post(`${this.URL}/line/sendQR/`, data);
  }
}
