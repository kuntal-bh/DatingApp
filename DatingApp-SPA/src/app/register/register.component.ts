import { AlertifyService } from './../_services/Alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};

@Output() cancelRegister = new EventEmitter();
  constructor(private authservice: AuthService , private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authservice.register(this.model).subscribe(() => {
      this.alertify.success('Registration was successfull');
    } , error => {
      this.alertify.error(error);
    }
    );
      }

  cancel() {
   this.cancelRegister.emit(false);
  }
}
