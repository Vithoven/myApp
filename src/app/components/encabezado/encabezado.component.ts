import { Component, OnInit, Input, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent  implements OnInit {
  @Input() titulo: string = '';
  @Input() showBackButton: boolean = false;

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {}

}
