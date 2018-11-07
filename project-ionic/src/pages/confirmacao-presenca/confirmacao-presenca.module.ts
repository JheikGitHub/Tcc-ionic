import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmacaoPresencaPage } from './confirmacao-presenca';
import { ParticipantePageModule } from '../participante/participante.module';
import { LoginPageModule } from '../login/login.module';

@NgModule({
  declarations: [
    ConfirmacaoPresencaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmacaoPresencaPage),
    LoginPageModule,
    ParticipantePageModule
  ],
})
export class ConfirmacaoPresencaPageModule {}
