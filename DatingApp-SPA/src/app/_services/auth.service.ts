import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   jwthelper = new JwtHelperService();
   decodedtoken: any;
constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post('http://localhost:5000/api/auth/login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user)  {
        localStorage.setItem('token', user.token);
        this.decodedtoken = this.jwthelper.decodeToken(user.token);
      }
    })
  );
}

register(model: any) {
return this.http.post('http://localhost:5000/api/auth/register', model);
}

loggedIn() {
const token = localStorage.getItem('token');
return !this.jwthelper.isTokenExpired(token);
}

}
