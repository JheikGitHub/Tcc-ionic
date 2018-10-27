import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { LoginProvider, UserAuthenticateDTO } from '../../providers/login/login';
import { Usuario } from '../../models/usuario';
import { HttpErrorResponse } from '@angular/common/http';
import { ParticipantePage } from '../participante/participante';
import { FuncionarioPage } from '../funcionario/funcionario';
import { AdminPage } from '../admin/admin';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('name') name: TextInput;
  private user: UserAuthenticateDTO = new UserAuthenticateDTO();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginProvider,
    private alert: AlertController,
    private toast: ToastController,
    private loading: LoadingController) {
  }

  ionViewDidLoad(): void {
    setTimeout(() => {
      this.name.setFocus();
    }, 500);
  }

  login() {
    this.loginService.autenticacao(this.user).subscribe(
      (data: any) => {
        this.presentLoading().present();
        this.loginService.setToken(data.access_token);
        this.loginService.getUser().subscribe(
          (data: Usuario) => {
            this.presentLoading().dismiss();
            if (data.Perfil.toLocaleLowerCase() == "aluno") {
              return this.navCtrl.push(ParticipantePage.name, { id: data.Id })
            } else if (data.Perfil.toLocaleLowerCase() == "funcionario") {
              return this.navCtrl.push(FuncionarioPage.name, { id: data.Id })
            } else {
              return this.navCtrl.push(AdminPage.name)
            }
          },
        );
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401)
          return this.toastMessage("Usuário não logado.");
        else {
          return this.toastMessage(err.error.error_description)
        }
      });
  }

  alertMessage(mensagem: string) {
    return this.alert.create({
      message: mensagem,
      title: "Aviso",
      buttons: ['OK']
    }).present();
  }

  toastMessage(mensagem: string) {
    return this.toast.create({
      message: mensagem,
      position: "top",
      duration: 5000
    }).present();
  }

  presentLoading() {
    return this.loading.create({
      content: "Aguarde...",
      duration: 3000
    });
  }
}
