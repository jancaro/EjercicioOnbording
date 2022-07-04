import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {BookModel} from "../../models/book.model";
import {ResponseBooksModel} from "../../models/responseBooks.model";
import {BookFilterModel} from "../../models/bookFilter.model";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  getBook(idBook: string): Observable<BookModel> {
    return this.http.get<BookModel>(`${environment.baseUrl}/books/owner/${idBook}`);
  }

  getFilterBooks(body: BookFilterModel): Observable<ResponseBooksModel> {
    return this.http.post<ResponseBooksModel>(`${environment.baseUrl}/books/filter`, body);
  }

  saveBook(body: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${environment.baseUrl}/books/owner`, body);
  }
}
