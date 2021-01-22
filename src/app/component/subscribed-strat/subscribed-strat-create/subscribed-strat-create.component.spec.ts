import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedStratCreateComponent } from './subscribed-strat-create.component';

describe('SubscribedStratCreateComponent', () => {
  let component: SubscribedStratCreateComponent;
  let fixture: ComponentFixture<SubscribedStratCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedStratCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedStratCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
