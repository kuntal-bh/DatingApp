import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_services/Alertify.service';
import { UserService } from './../_services/User.service';
import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
   constructor(private userService: UserService, private alertify: AlertifyService,
      private router: Router  ) {
   }

   resolve(route: ActivatedRouteSnapshot): Observable<User> {
      return this.userService.getUser(route.params['id']).pipe(catchError(error => {
         this.alertify.message(error);
         this.router.navigate(['/members']);
         return of(null);
      }));
   }
}
