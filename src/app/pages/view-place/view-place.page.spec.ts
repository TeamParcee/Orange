import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlacePage } from './view-place.page';

describe('ViewPlacePage', () => {
  let component: ViewPlacePage;
  let fixture: ComponentFixture<ViewPlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
