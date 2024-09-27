import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectAssistancePage } from './select-assistance.page';

describe('SelectAssistancePage', () => {
  let component: SelectAssistancePage;
  let fixture: ComponentFixture<SelectAssistancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAssistancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
