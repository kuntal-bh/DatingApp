import { User } from './../../_models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-member_card',
  templateUrl: './member_card.component.html',
  styleUrls: ['./member_card.component.css']
})
// tslint:disable-next-line:class-name
export class Member_cardComponent implements OnInit {
@Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
