import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RegisterOauthComponent} from './register-oauth.component';


describe('RegisterOauthComponent', () => {
  let component: RegisterOauthComponent;
  let fixture: ComponentFixture<RegisterOauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOauthComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
