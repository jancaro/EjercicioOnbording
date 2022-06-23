import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  getFilterBooks(body: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/books/filter`, body);
  }

  saveBook(body: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/books/owner`, body);
  }
}
