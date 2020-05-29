import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importamos nuestro componente para crear rutas
import {RegistrosComponent} from './registros/registros.component';
import {HomeComponent} from './home/home.component';
import {RegistrotiendaComponent} from './registrotienda/registrotienda.component'
import {CarritoComponent} from './carrito/carrito.component'
import {ConfirmarDatosComponent} from './confirmar-datos/confirmar-datos.component'
import {ImprimirReciboComponent} from './imprimir-recibo/imprimir-recibo.component'


//cremos las rutas
const routes: Routes = [
  {path:'',  component:HomeComponent},
  {path:'registros', component:RegistrosComponent},
  {path:'registrotienda', component:RegistrotiendaComponent},
  {path:'carrito', component:CarritoComponent},
  {path:'confirmar-datos', component:ConfirmarDatosComponent},
  {path:'imprimir-recibo', component:ImprimirReciboComponent},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }