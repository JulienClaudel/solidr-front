import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradecandleComponent } from './tradecandle.component';

describe('TradecandleComponent', () => {
  let component: TradecandleComponent;
  let fixture: ComponentFixture<TradecandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradecandleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradecandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
