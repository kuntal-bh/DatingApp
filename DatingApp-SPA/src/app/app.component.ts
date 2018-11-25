import { AuthService } from './_services/auth.service';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DatingApp-SPA';
  jwthelper = new JwtHelperService();
  constructor(private authservice: AuthService) {
  this.authservice.decodedtoken = this.jwthelper.decodeToken(localStorage.getItem('token')) ;
  }
}
