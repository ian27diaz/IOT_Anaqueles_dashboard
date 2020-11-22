import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioTablaComponent } from './inventario-tabla.component';

describe('InventarioTablaComponent', () => {
  let component: InventarioTablaComponent;
  let fixture: ComponentFixture<InventarioTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
