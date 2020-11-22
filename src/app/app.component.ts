import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nextOption = "tabla";

  public changeDashboard(newOption: string) {
    this.nextOption = newOption;
  }
}
