import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalConceptComponent } from './signal-concept.component';

describe('SignalConceptComponent', () => {
  let component: SignalConceptComponent;
  let fixture: ComponentFixture<SignalConceptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalConceptComponent]
    });
    fixture = TestBed.createComponent(SignalConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
