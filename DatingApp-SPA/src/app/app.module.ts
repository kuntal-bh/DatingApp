import { PhotoEditComponent } from './members/photo-edit/photo-edit.component';
import { PreventUnsaved } from './_guard/prevent-unsaved.guard';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { Member_cardComponent } from './members/member_card/member_card.component';
import { UserService } from './_services/User.service';
import { AuthGuard } from './_guard/auth.guard';
import { AlertifyService } from './_services/Alertify.service';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {  ErrorInteceptorProvider } from './_services/error.interceptor';
import { BsDropdownModule } from 'ngx-bootstrap' ;
import { TabsModule, PaginationModule  } from 'ngx-bootstrap';
import { Member_listComponent } from './members/member_list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { approutes } from './routes';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {TimeAgoPipe} from 'time-ago-pipe';
export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      Member_listComponent,
      ListsComponent,
      MessagesComponent,
      Member_cardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditComponent,
      TimeAgoPipe
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      NgxGalleryModule,
      FileUploadModule,
      ReactiveFormsModule,
      PaginationModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RouterModule.forRoot(approutes),
      JwtModule.forRoot({
         config : {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInteceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      PreventUnsaved
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
