import { AlertifyService } from './../_services/Alertify.service';
import { UserService } from './../_services/User.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userservice: UserService, private router: Router , private alertify: AlertifyService) {
    }
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userservice.getUsers().pipe(catchError(error => {
            this.alertify.error(error);
            this.router.navigate(['/home']);
            return of(null);
        }));
    }
}
