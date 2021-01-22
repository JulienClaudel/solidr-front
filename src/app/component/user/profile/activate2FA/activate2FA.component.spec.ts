import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Activate2FAComponent} from './activate2FA.component';


describe('Activate2FAComponent', () => {
  let component: Activate2FAComponent;
  let fixture: ComponentFixture<Activate2FAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Activate2FAComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Activate2FAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
