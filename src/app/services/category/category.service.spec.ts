import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";

describe('Category Service Test', () => {
  let service: CategoryService;
  let httpClientTesting: HttpTestingController;
  let apiUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService],
      imports: [ HttpClientTestingModule]
    })

    service = TestBed.inject(CategoryService);
    httpClientTesting = TestBed.inject(HttpTestingController);
  })

  it('Creación', () => {
    expect(service)
      .toBeTruthy()
  })

  it('debería ejecutar #getCategories para hacer llamada a api con método GET', () => {
    const mockMethod = 'GET';
    const mockResponseData = [
      {
        id: 1,
        description: "prueba"
      }
    ];
    const url = apiUrl+'/category';

    service.getCategories()
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

})
