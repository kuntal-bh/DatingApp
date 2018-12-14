import { PreventUnsaved } from './_guard/prevent-unsaved.guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { AuthGuard } from './_guard/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { Member_listComponent } from './members/member_list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';



export const approutes: Routes = [
    { path: '', component: HomeComponent },
    { path : '' ,
      runGuardsAndResolvers : 'always',
      canActivate: [AuthGuard],
      children: [
        { path: 'members', component: Member_listComponent , resolve : { users : MemberListResolver}  },
        { path: 'members/:id', component: MemberDetailComponent , resolve : { user: MemberDetailResolver} },
        { path: 'member/edit', component: MemberEditComponent , resolve : {user: MemberEditResolver},
          canDeactivate : [PreventUnsaved]},
        { path: 'messages', component: MessagesComponent },
        { path: 'lists', component: ListsComponent },
      ]
    },
    { path: '**', redirectTo: '' , pathMatch: 'full' },
];

