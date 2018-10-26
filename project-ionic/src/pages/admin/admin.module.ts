import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPage } from './admin';
import { AdminProvider } from '../../providers/admin/admin';
import { FuncionarioPageModule } from '../funcionario/funcionario.module';
import { ParticipantePageModule } from '../participante/participante.module';

@NgModule({
  declarations: [
    AdminPage
  ],
  imports: [
    IonicPageModule.forChild(AdminPage),
    ParticipantePageModule,
    FuncionarioPageModule
  ],
  providers: [AdminProvider]
})
export class AdminPageModule { }
