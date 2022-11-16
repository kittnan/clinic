import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL: any = environment.URL
  constructor(
    private http: HttpClient
  ) { }

  login(data:any): Observable<any>{
    return this.http.post(`${this.URL}/members/login/`,data)
  }
}
