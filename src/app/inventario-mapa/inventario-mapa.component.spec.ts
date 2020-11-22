import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioMapaComponent } from './inventario-mapa.component';

describe('InventarioMapaComponent', () => {
  let component: InventarioMapaComponent;
  let fixture: ComponentFixture<InventarioMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioMapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
