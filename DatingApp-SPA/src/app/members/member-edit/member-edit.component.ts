import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/User.service';
import { AlertifyService } from './../../_services/Alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../_models/user';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  photoUrl: string;
  @ViewChild('editform') editform: NgForm;
  @HostListener('window:beforeunload' , ['$event'])
  unloadNotification($event: any) {
    if (this.editform.dirty) {
      event.returnValue = true;
    }
  }
  constructor(private activatedroute: ActivatedRoute, private alertify: AlertifyService
    , private userservice: UserService , private authService: AuthService) { }

  ngOnInit() {
  this.activatedroute.data.subscribe(data => {
    this.user = data['user'];
    this.authService.currentPhotoUrl.subscribe(photo => {
      this.photoUrl = photo;
    });
  });
  }

  update() {
    this.userservice.updateUser(this.authService.decodedtoken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editform.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });

  }

  setprofilephoto(url: string) {
    this.user.photoUrl = url;
  }

}
