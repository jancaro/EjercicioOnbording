import { TestBed } from '@angular/core/testing';

import { LibraryService } from './library.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {TokenInterceptor} from "../../interceptors/token.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

describe('LibraryService', () => {
  let service: LibraryService;
  let httpClientTesting: HttpTestingController;
  let interceptor: TokenInterceptor;
  let apiUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibraryService, {
        multi: true,
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor
      }],
      imports: [ HttpClientTestingModule]
    });
    service = TestBed.inject(LibraryService);
    httpClientTesting = TestBed.inject(HttpTestingController);
  });

  it('Creación', () => {
    expect(service).toBeTruthy();
  });

  it('debería ejecutar #saveBook para hacer llamada a api con método POST', () => {
    const mockMethod = 'POST';
    const mockResponseData = {};
    const mockRequestData = {
      title: "",
      author: "",
      resume: "",
      image: "",
      url: "",
      category: [],
      public: false
    };
    jest.spyOn(sessionStorage, 'getItem').mockReturnValue('pruebaToken');
    const url = apiUrl+'/books/owner';

    service.saveBook({...mockRequestData})
      .subscribe(response => {
        expect(response)
          .toBe(mockResponseData);
      });

    const http = httpClientTesting.expectOne(url);
    const request = http.request;

    expect(request.method)
      .toBe(mockMethod);

    expect(request.body)
      .toEqual(mockRequestData);

    expect(request.headers.get('Authorization'))
      .not.toBeNull();

    http.flush(mockResponseData);
  });

});
