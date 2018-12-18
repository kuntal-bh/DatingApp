import { Pagination, PaginatedResult } from './../_models/pagination';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/Alertify.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/User.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-member_list',
  templateUrl: './member_list.component.html',
  styleUrls: ['./member_list.component.css']
})
// tslint:disable-next-line:class-name
export class Member_listComponent implements OnInit {
 users: User[];
 user: User = JSON.parse(localStorage.getItem('user')) ;
 userParams: any = {};
 genderList = [{value: 'male' , display: 'Males'}, {value: 'female' , display: 'Females'}];
 pagination: Pagination;
  constructor(private userService: UserService, private alertifyService
    : AlertifyService, private activated: ActivatedRoute) { }

  ngOnInit() {
    this.activated.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
      this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
      this.userParams.minAge = 18;
      this.userParams.maxAge = 99;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetfilters() {
    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
      this.userParams.minAge = 18;
      this.userParams.maxAge = 99;
      this.loadUsers();
  }
  loadUsers() {
  this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsperPage, this.userParams).subscribe
  ((res: PaginatedResult<User[]>) => {
   this.users = res.result;
  }, error => {
   this.alertifyService.error(error);
  });
  }

}
