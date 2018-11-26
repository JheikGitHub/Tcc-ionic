import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,  } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { LoginProvider } from '../../providers/login/login';
import { ParticipanteProvider } from '../../providers/participante/participante';
import { AdminPage } from '../admin/admin';
import { FuncionarioPage } from '../funcionario/funcionario';
import { Evento } from '../../models/evento';
import { ModalParticipantePage } from '../modal-participante/modal-participante';

@IonicPage()
@Component({
  selector: 'page-confirmacao-presenca',
  templateUrl: 'confirmacao-presenca.html',
})
export class ConfirmacaoPresencaPage {

  private eventoId;
  private evento: Evento;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private tokem: LoginProvider,
    private alert: AlertController,
    private serviceParticipante: ParticipanteProvider
  ) { }

  ionViewDidLoad() {
    this.eventoId = this.navParams.get('idEvento');
    this.serviceParticipante.buscaEventoId(this.eventoId).subscribe(
      (dados: Evento) => {
        this.evento = new Evento();
        this.evento = dados;
      }
    );
  }

  enviarDados() {
    this.navCtrl.push(ModalParticipantePage.name, { idEvento: this.eventoId })
  }

  voltar() {
    let perfil: string = this.navParams.get('perfil');
    if (perfil.toLowerCase() == 'admin')
      return this.navCtrl.setRoot(AdminPage.name);

    if (perfil.toLowerCase() == 'funcionario')
      return this.navCtrl.setRoot(FuncionarioPage.name);
  }

  logout() {
    let alert = this.alert.create({
      title: 'Aviso',
      message: 'Encerrar sua sessão nesse dispositivo?',
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          handler: () => {
            this.tokem.removeToken();
            this.tokem.removeUser();
            this.navCtrl.setRoot(LoginPage.name);
          }
        }
      ]
    });
    alert.present();

  }
}
