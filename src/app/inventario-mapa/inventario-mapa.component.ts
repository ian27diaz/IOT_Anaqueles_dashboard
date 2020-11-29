import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnaquelServiceService } from '../anaquel-service.service';
import { Anaquel } from '../anaqueles';

@Component({
  selector: 'app-inventario-mapa',
  templateUrl: './inventario-mapa.component.html',
  styleUrls: ['./inventario-mapa.component.css']
})
export class InventarioMapaComponent implements OnInit {

  anaqueles: Anaquel[] = [];
  copyAnaqueles: Anaquel[] = [];
  modeloBusqueda: string = "";
  colorBusqueda: string = "";
  numeroBusqueda: number = -1;
  origSize: number = -1;
  conteo_anaqueles: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private anaquelService: AnaquelServiceService) { }

  ngOnInit(): void {
    this.getAnaqueles();
  }

  getAnaqueles(): void {
    this.anaquelService.getAnaqueles()
      .subscribe(anaqueles => {
        this.anaqueles = anaqueles;
        this.origSize = this.anaqueles.length;

        this.anaqueles.forEach(val => this.copyAnaqueles.push(Object.assign({}, val)));
        this.anaqueles = this.anaquelService.filtrarPorSucursal(this.anaqueles, 'PS001');
        this.populateConteoAnaqueles();
      });
  }

  populateConteoAnaqueles(): void {
    this.conteo_anaqueles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.anaqueles.forEach(anaquel => {
      //console.log(anaquel);
      this.conteo_anaqueles[anaquel.Anaquel - 1] += Number(anaquel['Total de pares']);
      //console.log(this.conteo_anaqueles);
    })
  }

  busqueda(query: NgForm): void {
    this.resetBusqueda();
    console.log("Before: " + this.anaqueles.length);
    console.log(query.value.Numero);
    if(query.value.Modelo) {
      this.anaqueles = this.anaqueles.filter(o =>
        Object.keys(o).some(k => 
          o['Modelo'] == Number(query.value.Modelo)));
    }
    if(query.value.Color) {
      this.anaqueles = this.anaqueles.filter(o =>
        Object.keys(o).some(k => 
          o['Color'].toLowerCase().includes(query.value.Color.toLowerCase())));
    }
    if(query.value.Numero) {
      this.conteo_anaqueles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.anaqueles.forEach(val => {
        switch(query.value.Numero) {
          case 22:
            console.log(val);
            this.conteo_anaqueles[val.Anaquel - 1] += Number(val['Numeracion 22']);
            break;
          case 23:
            this.conteo_anaqueles[val.Anaquel - 1] += Number(val['Numeracion 23']);
            break;
          case 24:
            this.conteo_anaqueles[val.Anaquel - 1] += Number(val['Numeracion 24']);
            break;  
          case 25:
            this.conteo_anaqueles[val.Anaquel - 1] += Number(val['Numeracion 25']);
            break;
          case 26:
            this.conteo_anaqueles[val.Anaquel - 1] += Number(val['Numeracion 26']);
            break;   
          default: break;
        }
        
      });
      console.log(this.conteo_anaqueles);
      return;
    }
    this.populateConteoAnaqueles();
    if(this.anaqueles.length == 0) {
      this.buscarEnOtrasSucursales(query.value.Modelo, query.value.Color, query.value.Numero);
    }
    console.log("AFTER: " + this.anaqueles.length);
  }

  buscarEnOtrasSucursales(modelo: number, color: string, numero: string): void {
    console.log('Buscar en otras sucursales con: ' + modelo + ' ' + color + ' ' + numero);
    this.anaqueles = [];

    this.copyAnaqueles.forEach(anaquel => {
      if(anaquel.Sucursal != 'PS001' && anaquel.Modelo == modelo) this.anaqueles.push(anaquel);
    });

    console.log(this.anaqueles);
    console.log(this.copyAnaqueles);
    
    let map = new Map<string, number>();
    if(this.anaqueles.length > 0) {
      this.anaqueles.forEach(anaquel => {
        if(!map.has(anaquel.Sucursal)) {
          map.set(anaquel.Sucursal, anaquel["Total de pares"]);
        }
      });
      let sucursalesArr = [...map.keys()];
      alert('No se encontró ese modelo, pero en las siguientes sucursales si: ' + sucursalesArr);
    }
    this.resetBusqueda();
  }

  resetBusqueda(): void {
    console.log("Reset: ");
    this.anaqueles = [];
    this.copyAnaqueles.forEach(val => this.anaqueles.push(Object.assign({}, val)));
    this.anaqueles = this.anaquelService.filtrarPorSucursal(this.anaqueles, 'PS001')
    this.populateConteoAnaqueles();
  }

  filtrarPorSucursal(anaquelesList: Anaquel[], sucursal: string): Anaquel[] {
    return anaquelesList.filter(o =>
        Object.keys(o).some(k => o['Sucursal'].toLowerCase().includes(sucursal.toLowerCase())));
  }
}
