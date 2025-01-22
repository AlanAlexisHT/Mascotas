import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarMascotaComponent } from './components/agregar-mascota/agregar-mascota.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaMascotasComponent } from './components/lista-mascotas/lista-mascotas.component';

const routes: Routes = [
  {path:"enviarForm", component:AgregarMascotaComponent},
  {path:"listaMascotas", component:ListaMascotasComponent},
  {path:"contacto", component:ContactoComponent},
  {path:"",component:InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
