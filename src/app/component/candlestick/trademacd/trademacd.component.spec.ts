import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademacdComponent } from './trademacd.component';

describe('TrademacdComponent', () => {
  let component: TrademacdComponent;
  let fixture: ComponentFixture<TrademacdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrademacdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademacdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
