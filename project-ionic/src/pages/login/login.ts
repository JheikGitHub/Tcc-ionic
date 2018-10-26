import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, LoadingController, AlertController } from 'ionic-angular';

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
    private loading: LoadingController) {
  }

  ionViewDidLoad(): void {
    setTimeout(() => {
      this.name.setFocus();
    }, 500);
  }

  alertMessage(mensagem: string) {
    return this.alert.create({
      message: mensagem,
      title: "Aviso",
      buttons: ['OK']
    }).present();
  }

  presentLoading() {
    return this.loading.create({
      content: "Aguarde...",
      duration: 3000
    });
  }

  login() {
    this.presentLoading().present();
    this.loginService.autenticacao(this.user).subscribe(
      (data: any) => {
        this.loginService.setToken(data.access_token);
        this.loginService.getUser().subscribe(
          (data: Usuario) => {
            this.presentLoading().dismiss();
            if (data.Perfil.toLocaleLowerCase() == "aluno") {
              this.navCtrl.push(ParticipantePage.name, { id: data.Id })
            } else if (data.Perfil.toLocaleLowerCase() == "funcionario") {
              this.navCtrl.push(FuncionarioPage.name, { id: data.Id })
            } else {
              this.navCtrl.push(AdminPage.name)
            }
          },
          (err: HttpErrorResponse) => {
            this.presentLoading().dismiss();
            if (err.status == 401) {
              this.alertMessage("Acesso negado, verifique seu username e senha se estão corretos");
            }
            else {
              this.alertMessage("falha ao realiza login");
            }
          }
        );
      });
  }
}
