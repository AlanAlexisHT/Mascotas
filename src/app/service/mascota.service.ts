import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export enum Tipo {
  Ave = 'Ave',
  Canino = 'Canino',
  Felino = 'Felino',
  Equino = 'Equino',
  Pez = 'Pez',
  Reptil = 'Reptil',
  Roedor = 'Roedor',
  Rumiante = 'Rumiante'
}

export interface Mascota {
  id?: number,
  nombre: String,
  tipo: Tipo,
  descripcion: String,
  imagen: String
}

export type ContenidoTarjeta = {
  nombre: String,
  tipo: String,
  descripcion: String;
  imagen?: String
}

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private url = "http://localhost:4040";

  private mascotaSubject = new BehaviorSubject<Mascota[]>([]);
  mascota$ = this.mascotaSubject.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  verTodasMascotas() {
    this.httpClient.get<Mascota[]>(`${this.url}/listaMascotas`).subscribe(mascotas => {
      this.mascotaSubject.next(mascotas);
    });
  }

  verTodasMascotasPorTipo(tipo : Tipo): Observable<Mascota[]> {
    return this.httpClient.get<Mascota[]>(`${this.url}/listaMascotas?tipo${tipo}`);
  }

  verUnaMascota(nombre: String, tipo:Tipo ): Observable<Mascota> {
    return this.httpClient.get<Mascota>(`${this.url}/mascotas/${nombre+tipo}`);
  }

  guardarMascota(mascota: Mascota): Observable<Mascota> {
    return this.httpClient.post<Mascota>(`${this.url}/mascota`, mascota)
      .pipe(tap(() => this.verTodasMascotas())
      );
  }

  eliminarMascota(nombre: String,tipo:Tipo): Observable<Mascota> {
    return this.httpClient.delete<Mascota>(`${this.url}/mascotas/${nombre}/${tipo}`)
      .pipe(tap(() => this.verTodasMascotas()));
  }
}
