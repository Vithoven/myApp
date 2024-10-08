import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignaturasProfesorQrPage } from './asignaturas-profesor-qr.page';

describe('AsignaturasProfesorQrPage', () => {
  let component: AsignaturasProfesorQrPage;
  let fixture: ComponentFixture<AsignaturasProfesorQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturasProfesorQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
