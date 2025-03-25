import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IRegister } from '../models/iregister';
import { Ilogin } from '../models/ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  registerUser(user: IRegister): Observable<any> {
    return this.httpClient.post('/apiX/users', user);
  }

  loginUser(user: Ilogin): Observable<any> {
    return this.httpClient.post('/apiX/auth', user);
  }
}
