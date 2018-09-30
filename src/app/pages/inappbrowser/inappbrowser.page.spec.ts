import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InappbrowserPage } from './inappbrowser.page';

describe('InappbrowserPage', () => {
  let component: InappbrowserPage;
  let fixture: ComponentFixture<InappbrowserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InappbrowserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InappbrowserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
