
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importamos nuestro componente para crear rutas
import {RegistrosComponent} from './registros/registros.component';
import {HomeComponent} from './home/home.component';
import {RegistrotiendaComponent} from './registrotienda/registrotienda.component'
import {VerificarusuarioComponent} from './verificarusuario/verificarusuario.component';
import { CodigoverificadoComponent} from './codigoverificado/codigoverificado.component';
import {VerificartiendaComponent} from './verificartienda/verificartienda.component';
import {TiendaverificadoComponent} from './tiendaverificado/tiendaverificado.component';
import {PaneladministracionComponent} from './paneladministracion/paneladministracion.component';
import {DetalleproductComponent} from './detalleproduct/detalleproduct.component';
import {DetallesCategoriaComponent} from './detalles-categoria/detalles-categoria.component';
import {PerfiltiendaComponent} from './perfiltienda/perfiltienda.component';
import {ListatiendasComponent} from './listatiendas/listatiendas.component';

//componentes hijos de panel de administracion
import {MislistasComponent} from './mislistas/mislistas.component';
import {MisordenesComponent} from './misordenes/misordenes.component';
import {MitiendaComponent} from './mitienda/mitienda.component';
import {ConfiguracionComponent} from './configuracion/configuracion.component';
import {MiplanComponent} from './miplan/miplan.component';
import {CarritoComponent} from './carrito/carrito.component'
import {ConfirmarDatosComponent} from './confirmar-datos/confirmar-datos.component'
import {ImprimirReciboComponent} from './imprimir-recibo/imprimir-recibo.component'



//cremos las rutas
const routes: Routes = [
  {path:'',  component:HomeComponent},
  {path:'registros', component:RegistrosComponent},
  {path:'registrotienda', component:RegistrotiendaComponent},
  {path:'verificarusuario',component: VerificarusuarioComponent},
  {path: 'codigoverificado', component:CodigoverificadoComponent},
  {path: 'verificartienda',component:VerificartiendaComponent},
  {path: 'tiendaverificado',component:TiendaverificadoComponent},
  {path:'carrito', component:CarritoComponent},
  {path:'confirmar-datos', component:ConfirmarDatosComponent},
  {path:'imprimir-recibo', component:ImprimirReciboComponent},
  {path:'detallesproducto/:id', component:DetalleproductComponent},
  {path:'listatiendas', component:ListatiendasComponent},
  {path:'detallescategoria/:id', component:DetallesCategoriaComponent},
  {path:'perfiltienda', component:PerfiltiendaComponent},
  




  //panel de administrcion con angular  material
  {path: 'paneladministracion',component:PaneladministracionComponent, children: [
    {path: 'misordenes', component: MisordenesComponent },
    {path: 'mislistas', component: MislistasComponent },
    {path: 'mitienda', component: MitiendaComponent},
    {path: 'configuracion', component: ConfiguracionComponent},
    {path: 'miplan', component: MiplanComponent},

  ]},


];
  
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }