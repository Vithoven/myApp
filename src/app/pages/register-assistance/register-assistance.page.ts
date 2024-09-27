import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-assistance',
  templateUrl: './register-assistance.page.html',
  styleUrls: ['./register-assistance.page.scss'],
})
export class RegisterAssistancePage {
  subjectTitle: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const subject = params['subject'];
      this.setSubjectTitle(subject);
    });
  }

  setSubjectTitle(subject: string) {
    switch (subject) {
      case 'ingles':
        this.subjectTitle = 'Inglés';
        break;
      case 'arquitectura':
        this.subjectTitle = 'Arquitectura';
        break;
      case 'programacion':
        this.subjectTitle = 'Programación de Aplicaciones Móviles';
        break;
      default:
        this.subjectTitle = 'Asignatura';
    }
  }
}
