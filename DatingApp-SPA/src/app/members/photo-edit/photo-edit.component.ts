import { AlertifyService } from './../../_services/Alertify.service';
import { UserService } from './../../_services/User.service';
import { AuthService } from './../../_services/auth.service';
import { Photo } from './../../_models/photo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() setPhoto = new EventEmitter<string>();
  uploader: FileUploader ;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentmain: Photo;
  constructor(private authservice: AuthService, private userservice: UserService
    , private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

 fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url : this.baseUrl + 'users/' + this.authservice.decodedtoken.nameid + '/photos',
      maxFileSize: 10 * 1024 * 1024,
      authToken : 'Bearer ' + localStorage.getItem('token'),
      isHTML5 : true,
      allowedFileType : ['image'],
      removeAfterUpload : true,
      autoUpload : false
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item  , response, status , headers) => {
      const res: Photo  = JSON.parse(response);
      const photo = {
        id : res.id,
        dateAdded : res.dateAdded,
        description : res.description,
        url : res.url,
        isMain : res.isMain
      };
      this.photos.push(photo);
      if (photo.isMain) {
        this.authservice.changememberphoto(photo.url);
        this.authservice.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authservice.currentUser));
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userservice.setMainPhoto(this.authservice.decodedtoken.nameid, photo.id).subscribe(() => {
    this.currentmain = this.photos.filter(p => p.isMain === true)[0];
    this.currentmain.isMain = false;
    photo.isMain = true;
    this.authservice.changememberphoto(photo.url);
    this.authservice.currentUser.photoUrl = photo.url;
    localStorage.setItem('user', JSON.stringify(this.authservice.currentUser));
    }, error => {
      this.alertify.error(error);
    }
    );
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete the photo ? ', () => {
      this.userservice.deletePhoto(this.authservice.decodedtoken.nameid, id).subscribe(() => {
          this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
          this.alertify.success('Photo has been deleted');
      }, error => {
          this.alertify.error(error);
      });
    });
  }

}
