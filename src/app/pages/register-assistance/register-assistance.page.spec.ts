import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterAssistancePage } from './register-assistance.page';

describe('RegisterAssistancePage', () => {
  let component: RegisterAssistancePage;
  let fixture: ComponentFixture<RegisterAssistancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAssistancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
