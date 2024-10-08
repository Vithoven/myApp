import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarQrAsistenciaPage } from './generar-qr-asistencia.page';

describe('GenerarQrAsistenciaPage', () => {
  let component: GenerarQrAsistenciaPage;
  let fixture: ComponentFixture<GenerarQrAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarQrAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
