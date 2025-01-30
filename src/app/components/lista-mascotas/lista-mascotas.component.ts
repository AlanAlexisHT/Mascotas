import { Component, OnInit, signal } from '@angular/core';
import { ContenidoTarjeta, MascotaService } from '../../service/mascota.service';

@Component({
  selector: 'app-lista-mascotas',
  standalone: false,

  templateUrl: './lista-mascotas.component.html',
  styleUrl: './lista-mascotas.component.css'
})
export class ListaMascotasComponent implements OnInit {
  tarjetas = signal<ContenidoTarjeta[]>([]);


  constructor(private mascotaService: MascotaService) {

  }
  ngOnInit() {
    this.mascotaService.mascota$.subscribe((mascotas) => {
      const tarjetas: ContenidoTarjeta[] = mascotas.map(mascota => ({
        nombre: mascota.nombre,
        tipo: mascota.tipo,
        descripcion: mascota.descripcion,
        imagen: mascota.imagen
      }));

      this.tarjetas.set(tarjetas);
    })
    this.mascotaService.verTodasMascotas();
  }

  eliminarMascota(nombre:String){
    this.mascotaService.eliminarMascota(nombre).subscribe();
  }
}
