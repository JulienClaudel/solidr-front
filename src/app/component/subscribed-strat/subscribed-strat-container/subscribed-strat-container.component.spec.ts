import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedStratContainerComponent } from './subscribed-strat-container.component';

describe('SubscribedStratContainerComponent', () => {
  let component: SubscribedStratContainerComponent;
  let fixture: ComponentFixture<SubscribedStratContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedStratContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedStratContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
