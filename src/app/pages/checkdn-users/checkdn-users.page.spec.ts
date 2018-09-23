import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckdnUsersPage } from './checkdn-users.page';

describe('CheckdnUsersPage', () => {
  let component: CheckdnUsersPage;
  let fixture: ComponentFixture<CheckdnUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckdnUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckdnUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
