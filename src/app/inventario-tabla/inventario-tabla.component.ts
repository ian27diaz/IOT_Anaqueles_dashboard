import { Component, OnInit } from '@angular/core';
import { AnaquelServiceService } from '../anaquel-service.service';
import { Anaquel } from '../anaqueles';
import { ANAQUELES } from '../mock-anaqueles'; 
@Component({
  selector: 'app-inventario-tabla',
  templateUrl: './inventario-tabla.component.html',
  styleUrls: ['./inventario-tabla.component.css']
})
export class InventarioTablaComponent implements OnInit {

  anaqueles: Anaquel[] = [];
  headers = ["ID", "Anaquel", "Color", "Modelo", "Numeracion_22", "Numeracion_23", "Numeracion_24", "Numeracion_25", "Numeracion_26", "Total_de_pares"];
  
  
  constructor(private anaquelService: AnaquelServiceService) { }

  ngOnInit(): void {
    this.getAnaqueles();
  }


  getAnaqueles(): void {
    this.anaquelService.getAnaqueles()
      .subscribe(anaqueles => this.anaqueles = anaqueles);
  }
}
