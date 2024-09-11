import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8090/user/'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  getUserInfo(documentType: string, documentNumber: string): Observable<any> {
    let params = new HttpParams()
      .set('documentType', documentType)
      .set('documentNumber', documentNumber);
    
    return this.http.get<any>(this.apiUrl + 'userInfo', { params });
  }
}
