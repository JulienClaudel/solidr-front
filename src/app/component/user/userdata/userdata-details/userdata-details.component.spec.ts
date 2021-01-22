import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {UserdataDetailsComponent} from './userdata-details.component';


describe('UserdataDetailsComponent', () => {
  let component: UserdataDetailsComponent;
  let fixture: ComponentFixture<UserdataDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdataDetailsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
