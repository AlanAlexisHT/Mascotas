import { Component } from '@angular/core';
import { Mascota, MascotaService, Tipo } from '../../service/mascota.service';

@Component({
  selector: 'app-agregar-mascota',
  standalone: false,
  templateUrl: './agregar-mascota.component.html',
  styleUrl: './agregar-mascota.component.css'
})
export class AgregarMascotaComponent {
  mascotas : Mascota[] = [];
  constructor(private mascotaService: MascotaService) {

  }

  enviarMascota(nombre: String, tipo: Tipo, descripcion: String) {
    const mascota: Mascota = { nombre, tipo, descripcion };
    this.mascotaService.guardarMascota(mascota).subscribe({
      next: (response) => console.table(response),
      error: (error) => console.error("Error al guardar: ", error)
    });
  }
}
