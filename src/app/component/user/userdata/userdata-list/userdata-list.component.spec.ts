import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {UserdataListComponent} from './userdata-list.component';


describe('UserdataListComponent', () => {
  let component: UserdataListComponent;
  let fixture: ComponentFixture<UserdataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdataListComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
