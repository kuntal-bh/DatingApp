import { AuthGuard } from './_guard/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { Member_listComponent } from './member_list/member_list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';



export const approutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'members', component: Member_listComponent , canActivate: [AuthGuard] },
    { path: 'messages', component: MessagesComponent },
    { path: 'lists', component: ListsComponent },
    { path: '**', redirectTo: 'home' , pathMatch: 'full' },
];

