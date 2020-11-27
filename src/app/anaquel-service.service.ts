import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Anaquel } from './anaqueles';
import { ANAQUELES } from './mock-anaqueles';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AnaquelServiceService {

  anaquelesUrl = "https://hagsuwk150.execute-api.us-east-1.amazonaws.com/PROD";

  constructor(private http: HttpClient) { }

  getAnaqueles(): Observable<Anaquel[]> {
    //return of(ANAQUELES);
    return this.http.get<Anaquel[]>(this.anaquelesUrl + "/anaqueles")
  }

  filtrarPorSucursal(anaquelesList: Anaquel[], sucursal: string): Anaquel[] {
    return anaquelesList.filter(o =>
        Object.keys(o).some(k => o['Sucursal'].toLowerCase().includes(sucursal.toLowerCase())));
  }
}
