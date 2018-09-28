import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPlacesPage } from './other-places.page';

describe('OtherPlacesPage', () => {
  let component: OtherPlacesPage;
  let fixture: ComponentFixture<OtherPlacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPlacesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
