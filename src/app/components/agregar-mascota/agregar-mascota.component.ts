import { Component } from '@angular/core';
import { Mascota, MascotaService, Tipo } from '../../service/mascota.service';

@Component({
  selector: 'app-agregar-mascota',
  standalone: false,
  templateUrl: './agregar-mascota.component.html',
  styleUrl: './agregar-mascota.component.css'
})
export class AgregarMascotaComponent {
  constructor(private mascotaService: MascotaService) {

  }

  enviarMascota(nombre: String, tipo: Tipo, descripcion: String, imagen:String) {
    const mascota: Mascota = {nombre, tipo, descripcion, imagen };
    if(mascota){
      this.mascotaService.guardarMascota(mascota).subscribe({
        next: (response) => console.table(response),
        error: (error) => console.error("Error al guardar: ", error)
      });
    }
  }
}
