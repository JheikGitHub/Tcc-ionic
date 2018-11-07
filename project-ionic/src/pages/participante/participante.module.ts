import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipantePage } from './participante';
import { ParticipanteProvider } from '../../providers/participante/participante';
import { LoginPageModule } from '../login/login.module';

@NgModule({
  declarations: [
    ParticipantePage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipantePage),
    LoginPageModule
  ],
  providers: [ParticipanteProvider]
})
export class ParticipantePageModule { }
