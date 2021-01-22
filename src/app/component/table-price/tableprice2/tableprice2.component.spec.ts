import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableprice2Component } from './tableprice2.component';

describe('Tableprice2Component', () => {
  let component: Tableprice2Component;
  let fixture: ComponentFixture<Tableprice2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableprice2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableprice2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
