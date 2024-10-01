import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.page.html',
  styleUrls: ['./teacher-register.page.scss'],
})
export class TeacherRegisterPage {
  subjectTitle: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const subject = params['subject'];
      this.setSubjectTitle(subject);
    });
  }

  setSubjectTitle(subject: string) {
    switch (subject) {
      case 'java':
        this.subjectTitle = 'Java';
        break;
      case 'github':
        this.subjectTitle = 'GitHub';
        break;
      case 'programacion':
        this.subjectTitle = 'Programación de Aplicaciones Móviles';
        break;
      default:
        this.subjectTitle = 'Asignatura';
    }
  }
}