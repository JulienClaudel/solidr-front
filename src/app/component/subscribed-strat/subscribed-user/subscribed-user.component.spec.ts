import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedUserComponent } from './subscribed-user.component';

describe('SubscribedUserComponent', () => {
  let component: SubscribedUserComponent;
  let fixture: ComponentFixture<SubscribedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
