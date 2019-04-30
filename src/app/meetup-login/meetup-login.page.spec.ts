import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupLoginPage } from './meetup-login.page';

describe('MeetupLoginPage', () => {
  let component: MeetupLoginPage;
  let fixture: ComponentFixture<MeetupLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
