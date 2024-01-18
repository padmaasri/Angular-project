import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerativeAiComponent } from './generative-ai.component';

describe('GenerativeAiComponent', () => {
  let component: GenerativeAiComponent;
  let fixture: ComponentFixture<GenerativeAiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerativeAiComponent]
    });
    fixture = TestBed.createComponent(GenerativeAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
