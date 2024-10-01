import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-assignments',
  templateUrl: './teacher-assignments.page.html',
  styleUrls: ['./teacher-assignments.page.scss'],
})
export class TeacherAssignmentsPage {
  constructor(private router: Router) {}

  goToRegister(subject: string) {
    this.router.navigate(['/teacher-register', subject]);
  }
}
