import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class QueueHttpService {
  private URL: any = environment.URL;
  private sub: any = 'queue';
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}/`);
  }
  add(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.sub}/add/`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/${this.sub}/delete/` + id);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/${this.sub}/update/` + id, data);
  }
  queueDay(param:HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}/day`,{params:param});
  }
  queueWeek(param:HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}/week`,{params:param});
  }
  queueMonth(param:HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}/month`,{params:param});
  }
  queuePeriod(param:HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}/period`,{params:param});
  }

}
