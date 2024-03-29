import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MemberHttpService {
  URL: any = environment.URL
  constructor(
    private http: HttpClient
  ) { }

 
  get(p:any): Observable<any>{
    return this.http.get(`${this.URL}/members/`,{
      params:p
    })
  }
  getDoctor(): Observable<any>{
    return this.http.get(`${this.URL}/members/doctor`)
  }
  add(data:any): Observable<any>{
    return this.http.post(`${this.URL}/members/add/`,data)
  }
  delete(id:any): Observable<any>{
    return this.http.delete(`${this.URL}/members/delete/`+id)
  }
  update(id:any,data:any): Observable<any>{
    return this.http.put(`${this.URL}/members/update/`+id,data)
  }
  getLast(): Observable<any>{
    return this.http.get(`${this.URL}/members/last`)
  }
}
