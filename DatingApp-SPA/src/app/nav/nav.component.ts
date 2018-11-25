import { AlertifyService } from './../_services/Alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authservice
    : AuthService , private alertify: AlertifyService , private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authservice.login(this.model).subscribe(next => {
      // tslint:disable-next-line:quotemark
      this.alertify.success('Logged in Successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn()  {
  return this.authservice.loggedIn();
  }

  logout()  {
   localStorage.removeItem('token');
   this.router.navigate(['/home']);
   this.alertify.message('Logged Out');
  }
}
