import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUsageLimitComponent } from './set-usage-limit.component';

describe('UsersComponent', () => {
  let component: SetUsageLimitComponent;
  let fixture: ComponentFixture<SetUsageLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUsageLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUsageLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
