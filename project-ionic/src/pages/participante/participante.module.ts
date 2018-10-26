import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipantePage } from './participante';
import { ParticipanteProvider } from '../../providers/participante/participante';

@NgModule({
  declarations: [
    ParticipantePage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipantePage),
  ],
  providers: [ParticipanteProvider]
})
export class ParticipantePageModule { }
