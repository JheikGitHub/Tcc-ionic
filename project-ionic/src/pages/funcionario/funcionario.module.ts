import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionarioPage } from './funcionario';

@NgModule({
  declarations: [
    FuncionarioPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionarioPage),
  ],
})
export class FuncionarioPageModule {}
