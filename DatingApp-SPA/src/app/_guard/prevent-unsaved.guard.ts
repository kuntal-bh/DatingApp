import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PreventUnsaved implements CanDeactivate<MemberEditComponent> {
canDeactivate(component: MemberEditComponent) {
    if (component.editform.dirty) {
      return confirm('Are you sure you want to leave ? ');
    }
}
}
