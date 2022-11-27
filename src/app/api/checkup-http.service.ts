import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckupHttpService {

  URL: any = environment.URL
  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<any>{
    return this.http.get(`${this.URL}/checkup/`)
  }
  add(data:any): Observable<any>{
    return this.http.post(`${this.URL}/checkup/add/`,data)
  }
  delete(id:any): Observable<any>{
    return this.http.delete(`${this.URL}/Checkup/delete/`+id)
  }
  update(id:any,data:any): Observable<any>{
    return this.http.put(`${this.URL}/Checkup/update/`+id,data)
  }

}
