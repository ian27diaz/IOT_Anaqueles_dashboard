import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  nextOption = "mapa";
  @Output() nextOptionOutput: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {

  }

  footerClicked(): void {
    this.nextOption = (this.nextOption == "mapa") ? "tabla": "mapa";
    this.nextOptionOutput.emit(this.nextOption);
    console.log(this.nextOption);
  }

}
