import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Evento } from '../../models/evento';
import { FuncionarioProvider } from '../../providers/funcionario/funcionario';

import { ConfirmacaoPresencaPage } from '../confirmacao-presenca/confirmacao-presenca';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-funcionario',
  templateUrl: 'funcionario.html',
})
export class FuncionarioPage {

  private eventos: Evento[] = [];
  private IdUsuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert:AlertController,
    private tokem:LoginProvider,
    private serviceFuncionario: FuncionarioProvider) {
  }

  ionViewDidLoad() {
    this.IdUsuario = this.navParams.get('id');
    this.serviceFuncionario.buscaEventosFuncionario(this.IdUsuario).subscribe(
      (data: Evento[]) => { this.eventos = data },
      (err) => { console.log(err) }
    );
  }

  buscaIdEvento(idEvento) {    
    this.navCtrl.setRoot(ConfirmacaoPresencaPage.name, { idEvento: idEvento, perfil:"funcionario" })
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
