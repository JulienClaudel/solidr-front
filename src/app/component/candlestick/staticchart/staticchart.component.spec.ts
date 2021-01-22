import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticchartComponent } from './staticchart.component';

describe('StaticchartComponent', () => {
  let component: StaticchartComponent;
  let fixture: ComponentFixture<StaticchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticchartComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
