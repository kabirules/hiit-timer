import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaPagePage } from './insta-page.page';

describe('InstaPagePage', () => {
  let component: InstaPagePage;
  let fixture: ComponentFixture<InstaPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
