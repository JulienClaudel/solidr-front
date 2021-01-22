import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableprice3Component } from './tableprice3.component';

describe('Tableprice3Component', () => {
  let component: Tableprice3Component;
  let fixture: ComponentFixture<Tableprice3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableprice3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableprice3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
