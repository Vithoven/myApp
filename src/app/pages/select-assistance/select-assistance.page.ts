import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-assistance',
  templateUrl: './select-assistance.page.html',
  styleUrls: ['./select-assistance.page.scss'],
})
export class SelectAssistancePage {

  constructor(private router: Router) {}

  goToRegister(subject: string) {
    this.router.navigate(['/register-assistance', subject]);
  }
}
