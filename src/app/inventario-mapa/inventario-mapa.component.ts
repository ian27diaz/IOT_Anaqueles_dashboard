import { Component, OnInit } from '@angular/core';
import { AnaquelServiceService } from '../anaquel-service.service';
import { Anaquel } from '../anaqueles';

@Component({
  selector: 'app-inventario-mapa',
  templateUrl: './inventario-mapa.component.html',
  styleUrls: ['./inventario-mapa.component.css']
})
export class InventarioMapaComponent implements OnInit {

  anaqueles: Anaquel[] = [];
  conteo_anaqueles: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private anaquelService: AnaquelServiceService) { }

  ngOnInit(): void {
    this.getAnaqueles();
  }

  getAnaqueles(): void {
    this.anaquelService.getAnaqueles()
      .subscribe(anaqueles => {
        this.anaqueles = anaqueles;
        this.populateConteoAnaqueles();
      });
  }

  populateConteoAnaqueles(): void {
    this.anaqueles.forEach(anaquel => {
      console.log(anaquel);
      this.conteo_anaqueles[anaquel.Anaquel - 1] += Number(anaquel['Total de pares']);
      console.log(this.conteo_anaqueles);
    })
  }

}
