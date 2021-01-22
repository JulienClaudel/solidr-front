import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {UserdataUpdateComponent} from './userdata-update.component';


describe('UserdataUpdateComponent', () => {
  let component: UserdataUpdateComponent;
  let fixture: ComponentFixture<UserdataUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdataUpdateComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdataUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
