import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomValidateComponent } from './custom-validate.component';

describe('CustomValidateComponent', () => {
  let component: CustomValidateComponent;
  let fixture: ComponentFixture<CustomValidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomValidateComponent]
    });
    fixture = TestBed.createComponent(CustomValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
