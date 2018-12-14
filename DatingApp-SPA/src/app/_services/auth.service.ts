import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   jwthelper = new JwtHelperService();
   decodedtoken: any;
   currentUser: User;
   photoUrl = new BehaviorSubject<string>('../../assets/user.png');
   currentPhotoUrl = this.photoUrl.asObservable();
constructor(private http: HttpClient) { }

changememberphoto(photoUrl: string ) {
this.photoUrl.next(photoUrl)  ;
}

login(model: any) {
  return this.http.post('http://localhost:5000/api/auth/login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user)  {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.userDto) );
        this.decodedtoken = this.jwthelper.decodeToken(user.token);
        this.currentUser = user.userDto;
       this.changememberphoto(this.currentUser.photoUrl);
      }
    })
  );
}

register(user: User) {
return this.http.post('http://localhost:5000/api/auth/register', user);
}

loggedIn() {
const token = localStorage.getItem('token');
return !this.jwthelper.isTokenExpired(token);
}

}
