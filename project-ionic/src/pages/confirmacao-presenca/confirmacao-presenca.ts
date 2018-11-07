import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { Participante } from '../../models/participante';
import { LoginProvider } from '../../providers/login/login';
import { ConfirmacaoPresenca, ParticipanteProvider } from '../../providers/participante/participante';

@IonicPage()
@Component({
  selector: 'page-confirmacao-presenca',
  templateUrl: 'confirmacao-presenca.html',
})
export class ConfirmacaoPresencaPage {

  private participante: Participante;
  private confirmacaoPresenca: ConfirmacaoPresenca;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private tokem: LoginProvider,
    private alert: AlertController,
    private serviceParticipante: ParticipanteProvider
  ) {
  }

  ionViewDidLoad() {
    this.participante = new Participante();
    this.participante = this.navParams.get('usuario');

    this.confirmacaoPresenca = new ConfirmacaoPresenca();
    this.confirmacaoPresenca.UsuarioId = this.participante.Id;
    this.confirmacaoPresenca.EventoId = this.navParams.get('eventoId');
  }

  confirmaPresencaParticipante() {
    this.serviceParticipante.confirmaPresenca(this.confirmacaoPresenca).subscribe(
      () => {
        let resultado = "Presença do(a) " + this.participante.Usuario.Nome + " confirmada com sucesso."
        return this.alertMensagem(resultado);
      },
      (err: HttpErrorResponse) => {
        return this.alertMensagem(err.error.Message)
      }
    );
  }

  cancelarOperacao() {
    return this.alertMensagem('Operação cancelada.')
  }

  logout() {
    this.tokem.removeToken();
    this.tokem.removeUser();
    this.navCtrl.setRoot(LoginPage.name);
  }

  alertMensagem(mensagem: string) {
    return this.alert.create({
      title: "Aviso.",
      message: mensagem,
      buttons: ["OK"]
    }).present();
  }



}
