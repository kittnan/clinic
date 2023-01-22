import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesHttpService {
  private URL: any = environment.URL;
  private sub: any = 'files';
  constructor(private http: HttpClient) {}

  upload(formData: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.sub}/upload`, formData);
  }
  delete(param: any): Observable<any> {
    return this.http.delete(`${this.URL}/${this.sub}/delete`, {
      params: param,
    });
  }
}
