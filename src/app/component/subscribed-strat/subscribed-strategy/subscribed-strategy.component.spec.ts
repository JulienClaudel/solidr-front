import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedStrategyComponent } from './subscribed-strategy.component';

describe('SubscribedStrategyComponent', () => {
  let component: SubscribedStrategyComponent;
  let fixture: ComponentFixture<SubscribedStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedStrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
