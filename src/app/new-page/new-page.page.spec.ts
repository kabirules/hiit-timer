import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPagePage } from './new-page.page';

describe('NewPagePage', () => {
  let component: NewPagePage;
  let fixture: ComponentFixture<NewPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
