import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Anaquel } from './anaqueles';
import { ANAQUELES } from './mock-anaqueles';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AnaquelServiceService {

  constructor(private http: HttpClient) { }

  getAnaqueles(): Observable<Anaquel[]> {
    return of(ANAQUELES);
    /*return this.http.get<Anaquel[]>(this.anaquelesUrl)
        .pipe(
          catchError(this.handleError<Anaquel[]>('getAnaqueles', []))
        );
    */
  }
}
