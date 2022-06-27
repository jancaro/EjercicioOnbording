import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";

describe('UserService', () => {
  let service: UserService;
  let httpClientTesting: HttpTestingController;
  let apiUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [ HttpClientTestingModule]
    });

    service = TestBed.inject(UserService);
    httpClientTesting = TestBed.inject(HttpTestingController);
  });

  it('Creación', () => {
    expect(service)
      .toBeTruthy();
  });

  it('debería ejecutar #verifyUsername para hacer llamada a api con método GET', function () {
    const mockMethod = 'GET';
    const mockResponseData = {
      exists: true
    };
    const mockParameter = 'username';
    const url = apiUrl+'/users/exist-name/'+mockParameter;

    service.verifyUsername(mockParameter)
      .subscribe(data => {
        expect(data)
          .toBe(mockResponseData);
      });

    const http = httpClientTesting.expectOne(url);
    const request = http.request;

    expect(request.method)
      .toBe(mockMethod);

    http.flush(mockResponseData);

    httpClientTesting.verify();
  });

  it('debería ejecutar #loginUser para hacer llamada a api con método POST', () => {
    const mockMethod = 'POST';
    const mockResponseData = {};
    const mockRequestData = {
      username: "prueba",
      password: "prueba"
    };
    const url = apiUrl+'/users/login';
    const spySession = jest.spyOn(sessionStorage, 'setItem')

    service.loginUser({...mockRequestData})
      .subscribe(response => {
        expect(spySession)
          .toBeCalled()

        expect(spySession)
          .toBeCalledTimes(1)

        expect(response)
          .toBe(mockResponseData);
      });



    const http = httpClientTesting.expectOne(url);
    const request = http.request;

    expect(request.method)
      .toBe(mockMethod);

    expect(request.body)
      .toEqual(mockRequestData);

    http.flush(mockResponseData);
  });
});
