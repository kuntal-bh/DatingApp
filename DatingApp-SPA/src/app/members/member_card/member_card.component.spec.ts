/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Member_cardComponent } from './member_card.component';

describe('Member_cardComponent', () => {
  let component: Member_cardComponent;
  let fixture: ComponentFixture<Member_cardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Member_cardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Member_cardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
