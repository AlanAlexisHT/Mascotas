import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export enum Tipo {
  AVE = 'Ave',
  CANINO = 'Canino',
  FELINO = 'Felino',
  EQUINO = 'Equino',
  PEZ = 'Pez',
  REPTIL = 'Reptil',
  ROEDOR = 'Roedor',
  RUMIANTE = 'Rumiante'
}

export interface Mascota {
  nombre: String,
  tipo: Tipo,
  descripcion: String,
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

  verTodasMascotas(): Observable<Mascota[]> {
    return this.httpClient.get<Mascota[]>(`${this.url}/listaMascotas`);
  }

  verTodasMascotasPorTipo(tipo : Tipo): Observable<Mascota[]> {
    return this.httpClient.get<Mascota[]>(`${this.url}/listaMascotas?tipo${tipo}`);
  }

  verUnaMascota(id: number): Observable<Mascota> {
    return this.httpClient.get<Mascota>(`${this.url}/mascotas/${id}`);
  }

  guardarMascota(mascota: Mascota): Observable<Mascota> {
    return this.httpClient.post<Mascota>(`${this.url}/mascota`, mascota)
      .pipe(tap(() => this.verTodasMascotas())
      );
  }

  eliminarMascota(id: number): Observable<Mascota> {
    return this.httpClient.delete<Mascota>(`${this.url}/mascotas/${id}`)
      .pipe(tap(() => this.verTodasMascotas().subscribe()));
  }
}
