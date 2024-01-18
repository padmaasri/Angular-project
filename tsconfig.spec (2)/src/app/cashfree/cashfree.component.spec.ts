import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashfreeComponent } from './cashfree.component';

describe('CashfreeComponent', () => {
  let component: CashfreeComponent;
  let fixture: ComponentFixture<CashfreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashfreeComponent]
    });
    fixture = TestBed.createComponent(CashfreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
