import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedStratComponent } from './subscribed-strat.component';

describe('SubscribedStratComponent', () => {
  let component: SubscribedStratComponent;
  let fixture: ComponentFixture<SubscribedStratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedStratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedStratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
