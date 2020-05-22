import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importamos nuestro componente para crear rutas
import {RegistrosComponent} from './registros/registros.component';
import {HomeComponent} from './home/home.component';
import {RegistrotiendaComponent} from './registrotienda/registrotienda.component'
//cremos las rutas
const routes: Routes = [
  {path:'',  component:HomeComponent},
  {path:'registros', component:RegistrosComponent},
  {path:'registrotienda', component:RegistrotiendaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }