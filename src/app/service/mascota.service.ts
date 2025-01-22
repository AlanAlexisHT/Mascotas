import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export enum Tipo{
  AVE = 'Ave',
  CANINO = 'Canino',
  FELINO = 'Felino',
  EQUINO = 'Equino',
  PEZ = 'Pez',
  REPTIL = 'Reptil',
  ROEDOR = 'Roedor',
  RUMIANTE = 'Rumiante'
}

export interface Mascota{
	nombre: String,
	tipo: Tipo,
	descripcion: String,
  imagen:String
}

@Injectable({
  providedIn: 'root'
})
export class MascotaService {



  constructor(private http: HttpClient) {

  }

  ver_TodasLasMascotas(){

  }
}
