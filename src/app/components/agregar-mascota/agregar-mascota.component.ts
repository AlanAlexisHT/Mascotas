import { Component } from '@angular/core';
import { Mascota } from '../../service/mascota.service';

@Component({
  selector: 'app-agregar-mascota',
  standalone: false,
  templateUrl: './agregar-mascota.component.html',
  styleUrl: './agregar-mascota.component.css'
})
export class AgregarMascotaComponent {

	constructor(){

	}

	enviarMascota(mascota: Mascota){

	}

}
