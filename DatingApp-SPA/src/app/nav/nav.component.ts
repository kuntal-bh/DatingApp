import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authservice
    : AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authservice.login(this.model).subscribe(next => {
      console.log('User Logged Successfully');
    }, error => {
      console.log(error);
    });
  }

  loggedIn()  {
    const token = localStorage.getItem('token') ;
    return !!token;
  }

  logout()  {
   localStorage.removeItem('token');
  }
}
