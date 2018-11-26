import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipantePage } from './participante';
import { ParticipanteProvider } from '../../providers/participante/participante';
import { LoginPageModule } from '../login/login.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    ParticipantePage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipantePage),
    LoginPageModule,
    QRCodeModule
  ],
  providers: [ParticipanteProvider]
})
export class ParticipantePageModule { }
