import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Deactivate2FAComponent} from './deactivate2FA.component';


describe('Deactivate2FAComponent', () => {
  let component: Deactivate2FAComponent;
  let fixture: ComponentFixture<Deactivate2FAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Deactivate2FAComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Deactivate2FAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
