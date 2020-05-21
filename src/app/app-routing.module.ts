import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importamos nuestro componente para crear rutas
import {RegistrosComponent} from './registros/registros.component';
import {HomeComponent} from './home/home.component';
import {VerificarusuarioComponent} from './verificarusuario/verificarusuario.component';
import { CodigoverificadoComponent} from './codigoverificado/codigoverificado.component';
import {VerificartiendaComponent} from './verificartienda/verificartienda.component';
import {TiendaverificadoComponent} from './tiendaverificado/tiendaverificado.component';
import {PaneldecontrolComponent} from './paneldecontrol/paneldecontrol.component';

//cremos las rutas
const routes: Routes = [
  {path:'',  component:HomeComponent},
  {path:'registros', component:RegistrosComponent},
  {path:'verificarusuario',component: VerificarusuarioComponent},
  {path: 'codigoverificado', component:CodigoverificadoComponent},
  {path: 'verificartienda',component:VerificartiendaComponent},
  {path: 'tiendaverificado',component:TiendaverificadoComponent},
  {path: 'panel', component:PaneldecontrolComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }