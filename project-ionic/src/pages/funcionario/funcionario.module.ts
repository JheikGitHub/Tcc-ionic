import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionarioPage } from './funcionario';
import { FuncionarioProvider } from '../../providers/funcionario/funcionario';
import { FiltrarEventoPipe } from '../../pipes/filtrar-evento/filtrar-evento';
import { ParticipantePageModule } from '../participante/participante.module';

@NgModule({
  declarations: [
    FuncionarioPage,
    FiltrarEventoPipe
  ],
  exports:[
    FiltrarEventoPipe
  ],
  imports: [
    IonicPageModule.forChild(FuncionarioPage),
    ParticipantePageModule
  ],
  providers:[FuncionarioProvider]
})
export class FuncionarioPageModule {}
