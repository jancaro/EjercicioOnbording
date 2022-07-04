import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, mapTo, Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {UserModel} from "../../models/user.model";
import {LoginModel} from "../../models/login.model";
import {ResponseLoginModel} from "../../models/responseLogin.model";
import {VerificationUserModel} from "../../models/verification-user.model";
import {ResponseSuccessModel} from "../../models/responseSuccess.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  verifyUsername(username: string): Observable<VerificationUserModel> {
    return this.http.get<VerificationUserModel>(`${environment.baseUrl}/users/exist-name/${username}`);
  }

  registerUser(body: UserModel): Observable<ResponseSuccessModel> {
    return this.http.post<ResponseSuccessModel>(`${environment.baseUrl}/users`, body);
  }

  loginUser(body: LoginModel): Observable<ResponseLoginModel> {
    return this.http.post<ResponseLoginModel>(`${environment.baseUrl}/users/login`, body).pipe(
      tap((result: any) => {
        sessionStorage.clear();
        sessionStorage.setItem('tokenType', result.tokenType);
        sessionStorage.setItem('token', result.access_token);
        sessionStorage.setItem('userId', result.user.userId);
      }),
      catchError(err => {
        throw err;
      })
    );
  }
}
