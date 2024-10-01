import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherAssignmentsPage } from './teacher-assignments.page';

describe('TeacherAssignmentsPage', () => {
  let component: TeacherAssignmentsPage;
  let fixture: ComponentFixture<TeacherAssignmentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAssignmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
