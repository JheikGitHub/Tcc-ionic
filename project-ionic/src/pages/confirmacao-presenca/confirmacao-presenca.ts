import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Participante } from '../../models/participante';

@IonicPage()
@Component({
  selector: 'page-confirmacao-presenca',
  templateUrl: 'confirmacao-presenca.html',
})
export class ConfirmacaoPresencaPage {

  private participante: Participante;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.participante = new Participante();
    this.participante = this.navParams.get('usuario');
  }

  toastMessage(mensagem: string) {
    return this.toast.create({
      message: mensagem,
      position: "botton",
      duration: 5000
    }).present();
  }

}
