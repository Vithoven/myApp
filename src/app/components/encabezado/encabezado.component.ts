import { Component, OnInit, Input, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent  implements OnInit {
  @Input() titulo: string = '';
  @Input() showBackButton: boolean = false;

  constructor(private router: Router) { }
  private utilsService: UtilsService = inject(UtilsService);
  goBack() {
    this.utilsService.navigateBack();
  }

  ngOnInit() {}

}
