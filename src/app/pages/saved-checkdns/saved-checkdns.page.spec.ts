import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCheckdnsPage } from './saved-checkdns.page';

describe('SavedCheckdnsPage', () => {
  let component: SavedCheckdnsPage;
  let fixture: ComponentFixture<SavedCheckdnsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedCheckdnsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCheckdnsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
