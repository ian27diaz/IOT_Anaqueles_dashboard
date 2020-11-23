import { Component, OnInit } from '@angular/core';
import { AnaquelServiceService } from '../anaquel-service.service';
import { Anaquel } from '../anaqueles';
@Component({
  selector: 'app-inventario-tabla',
  templateUrl: './inventario-tabla.component.html',
  styleUrls: ['./inventario-tabla.component.css']
})
export class InventarioTablaComponent implements OnInit {

  anaqueles: Anaquel[] = [];
  headers = ["ID", "Anaquel", "Color", "Modelo", "Numeracion 22", "Numeracion 23", "Numeracion 24", "Numeracion 25", "Numeracion 26", "Total de pares"];
  
  
  constructor(private anaquelService: AnaquelServiceService) { }

  ngOnInit(): void {
    this.getAnaqueles();
  }


  getAnaqueles(): void {
    this.anaquelService.getAnaqueles()
      .subscribe(anaqueles => this.anaqueles = anaqueles);
  }
}
