import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCreateComponent } from './trade-create.component';

describe('TradeCreateComponent', () => {
  let component: TradeCreateComponent;
  let fixture: ComponentFixture<TradeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
