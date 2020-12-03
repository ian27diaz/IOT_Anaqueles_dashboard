import { Component, OnInit } from '@angular/core';
import { AnaquelServiceService } from '../anaquel-service.service';
import { Anaquel } from '../anaqueles';
// import { Chart } from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-inventario-tabla',
  templateUrl: './inventario-tabla.component.html',
  styleUrls: ['./inventario-tabla.component.css']
})
export class InventarioTablaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Gráfica mostrando la repartición en % del stock actual' }
  ];

  //Grafica 2
  barChartOptions2: ChartOptions = {
    responsive: true,
  };
  barChartLabels2: Label[] = [];
  barChartType2: ChartType = 'pie';
  barChartLegend2 = true;
  barChartPlugins2 = [];

  barChartData2: ChartDataSets[] = [
    { data: [], label: 'Gráfica mostrando la repartición en % del stock actual' }
  ];

  anaqueles: Anaquel[] = [];
  headers = ["ID", "Anaquel", "Color", "Modelo", "Numeracion 22", "Numeracion 23", "Numeracion 24", "Numeracion 25", "Numeracion 26", "Total de pares", "Fecha de entrada"];

  config: any;

  constructor(private anaquelService: AnaquelServiceService) { }
  /*chart = new Chart('grafica', {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{data:[], label:'Modelos'}]
    },
    options: {
      title: {
        display: true,
        text: 'Gráfica mostrando la repartición en % del stock actual'
      }
    }
  });*/

  ngOnInit(): void {
    this.getAnaqueles();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };



  }


  getAnaqueles(): void {
    this.anaquelService.getAnaqueles()
      .subscribe(anaqueles => {
        this.anaqueles = anaqueles;
        this.anaqueles = this.anaquelService.filtrarPorSucursal(this.anaqueles, 'PS001');
        this.poblarGrafica();
        this.poblarGrafica2();
      });

  }

  poblarGrafica(): void {
    let map = new Map<string, number>();
    this.anaqueles.forEach(anaquel => {
      //  console.log(anaquel);
      if(anaquel.Modelo == 422) {
        console.log(anaquel);
      }
      let existeModelo = map.has(String(anaquel.Modelo));

      if (existeModelo) {
        let valorAntiguo = map.get(String(anaquel.Modelo));
        if(valorAntiguo != undefined) {
        map.set(String(anaquel.Modelo), Number(anaquel['Total de pares']) + Number(valorAntiguo));
      }
      } else {
        map.set(String(anaquel.Modelo), anaquel['Total de pares']);
      }
    });
    //this.chart.data.datasets = [...map.values()];
    //this.chart.data.labels = [...map.keys()];
    this.barChartData[0].data = [...map.values()];
    this.barChartLabels = [...map.keys()];
  }

  poblarGrafica2(): void {
    let map = new Map<string, number>();
    this.anaqueles.forEach(anaquel => {
      //  console.log(anaquel);
      let existeModelo = map.has(String(anaquel.Modelo));

      if (existeModelo) {
        let valorAntiguo = map.get(String(anaquel.Modelo));
        if(valorAntiguo != undefined) {
        map.set(String(anaquel.Modelo), Number(anaquel['Anaquel']));
      }
      } else {
        map.set(String(anaquel.Modelo), anaquel['Anaquel']);
      }
    });
    //this.chart.data.datasets = [...map.values()];
    //this.chart.data.labels = [...map.keys()];
    this.barChartData2[0].data = [...map.values()];
    this.barChartLabels2 = [...map.keys()];
  }

  pageChanged(event: any): void {
    this.config.currentPage = event;
  }
}
