import { Component, OnInit, Input, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-encabezado-profe',
  templateUrl: './encabezado-profe.component.html',
  styleUrls: ['./encabezado-profe.component.scss'],
})
export class EncabezadoProfeComponent  implements OnInit {
  @Input() titulo: string = '';
  @Input() showBackButton: boolean = false;

  constructor(private router: Router) { }
  private utilsService: UtilsService = inject(UtilsService);
  goBack() {
    this.utilsService.navigateBack();
  }

  ngOnInit() {}

}
