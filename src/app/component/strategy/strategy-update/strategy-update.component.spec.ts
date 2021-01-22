import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyUpdateComponent } from './strategy-update.component';

describe('StrategyUpdateComponent', () => {
  let component: StrategyUpdateComponent;
  let fixture: ComponentFixture<StrategyUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategyUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
