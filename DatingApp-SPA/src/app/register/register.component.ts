import { User } from './../_models/user';
import { AlertifyService } from './../_services/Alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user: User;
registerForm: FormGroup;
bsConfig: Partial<BsDatepickerConfig>;

@Output() cancelRegister = new EventEmitter();
  constructor(private authservice: AuthService , private alertify: AlertifyService
    , private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
    this.bsConfig = {
      containerClass : 'theme-red'
    };
  }

  createRegisterForm() {
    this.registerForm  = this.fb.group({
      gender : ['male'],
      username : ['', Validators.required],
      password : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmpassword : ['', Validators.required ],
      knownAs : ['', Validators.required],
      dateOfBirth : ['', Validators.required],
      city : ['', Validators.required],
      country : ['', Validators.required]
    }, { validator : this.passwordMatch} ) ;
  }

  passwordMatch(g: FormGroup) {
   return g.get('password').value === g.get('confirmpassword').value ? null :  {'mismatch' : true};
  }
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authservice.register(this.user).subscribe(() => {
      this.alertify.success('Registration was successfull');
       } , error => {
       this.alertify.error(error);
       }, () => {
         this.authservice.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
         });
       }
     );
    }
  }

  cancel() {
   this.cancelRegister.emit(false);
  }
}
