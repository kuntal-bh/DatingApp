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
  constructor(private userService: UserService, private alertifyService
    : AlertifyService, private activated: ActivatedRoute) { }

  ngOnInit() {
    this.activated.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  loadUsers() {
  this.userService.getUsers().subscribe((response: User[]) => {
    this.users = response;
    this.alertifyService.success('Users are Loaded Successfully');
  }, error => {
    this.alertifyService.error(error);
  });
  }

}
