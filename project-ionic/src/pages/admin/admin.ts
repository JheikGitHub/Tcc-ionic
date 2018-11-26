import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Evento } from '../../models/evento';
import { AdminProvider } from '../../providers/admin/admin';
import { ConfirmacaoPresencaPage } from '../confirmacao-presenca/confirmacao-presenca';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  private eventos: Evento[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertController,
    private tokem: LoginProvider,
    private adminService: AdminProvider) {
  }

  ionViewDidLoad() {
    this.adminService.buscaTodosEventos().subscribe(
      (dados: Evento[]) => { this.eventos = dados },
      (err) => { console.log(err) }
    );
  }
  
  buscaIdEvento(idEvento) {    
    this.navCtrl.setRoot(ConfirmacaoPresencaPage.name, { idEvento: idEvento, perfil:"admin" })
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
