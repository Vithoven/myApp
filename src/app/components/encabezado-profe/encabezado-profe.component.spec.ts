import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncabezadoProfeComponent } from './encabezado-profe.component';

describe('EncabezadoProfeComponent', () => {
  let component: EncabezadoProfeComponent;
  let fixture: ComponentFixture<EncabezadoProfeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EncabezadoProfeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncabezadoProfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
