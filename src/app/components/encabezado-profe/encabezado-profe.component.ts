import { Component, OnInit, Input, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encabezado-profe',
  templateUrl: './encabezado-profe.component.html',
  styleUrls: ['./encabezado-profe.component.scss'],
})
export class EncabezadoProfeComponent  implements OnInit {
  @Input() titulo: string = '';
  @Input() showBackButton: boolean = false;

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/home-profe']);
  }

  ngOnInit() {}

}
