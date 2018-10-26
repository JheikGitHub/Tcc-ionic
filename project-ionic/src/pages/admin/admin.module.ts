import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPage } from './admin';
import { AdminProvider } from '../../providers/admin/admin';
import { FuncionarioPageModule } from '../funcionario/funcionario.module';

@NgModule({
  declarations: [
    AdminPage
  ],
  imports: [
    IonicPageModule.forChild(AdminPage),
    FuncionarioPageModule
  ],
  providers: [AdminProvider]
})
export class AdminPageModule { }
