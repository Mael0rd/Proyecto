import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  //private urlJson = 'assets/data/provincia_canton_distrito_CR.json';

  constructor(private http: HttpClient) { }

  cargarUbicaciones(): Observable<any> {
    return this.http.get<any>('assets/data/provincia_canton_distrito_CR.json');
  }
}
