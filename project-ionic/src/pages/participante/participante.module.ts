import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipantePage } from './participante';

@NgModule({
  declarations: [
    ParticipantePage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipantePage),
  ],
})
export class ParticipantePageModule {}
