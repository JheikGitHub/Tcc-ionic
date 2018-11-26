import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalParticipantePage } from './modal-participante';
import { ParticipantePageModule } from '../participante/participante.module';
import { LoginPageModule } from '../login/login.module';

@NgModule({
  declarations: [
    ModalParticipantePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalParticipantePage),
    LoginPageModule,
    ParticipantePageModule
  ],
})
export class ModalParticipantePageModule {}
