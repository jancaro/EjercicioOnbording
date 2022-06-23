import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  verifyUsername(username: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users/exist-name/${username}`);
  }

  registerUser(body: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/users`, body);
  }

  loginUser(body: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/login`, body);
  }
}
