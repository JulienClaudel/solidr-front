import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmActivateComponent } from './confirm-activate.component';

describe('ConfirmActivateComponent', () => {
  let component: ConfirmActivateComponent;
  let fixture: ComponentFixture<ConfirmActivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmActivateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
