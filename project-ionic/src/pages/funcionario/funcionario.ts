import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Evento } from '../../models/evento';
import { FuncionarioProvider } from '../../providers/funcionario/funcionario';
import { ParticipanteProvider } from '../../providers/participante/participante';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
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
  cod: BarcodeScanResult;
  private IdUsuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    private toast: ToastController,
    private tokem:LoginProvider,
    private serviceParticipante: ParticipanteProvider,
    private serviceFuncionario: FuncionarioProvider) {
  }

  ionViewDidLoad() {

    this.IdUsuario = this.navParams.get('id');

    this.serviceFuncionario.buscaEventosFuncionario(this.IdUsuario).subscribe(
      (data: Evento[]) => { this.eventos = data },
      (err) => { console.log(err) }
    );
  }

  async scan(eventoId) {
    await this.barcode.scan()
      .then((codBarra) => { this.cod = codBarra })
      .catch((err: Error) => {
        this.toastMessage(err.message);
      });

    if (this.cod.cancelled == true) {
      this.toastMessage("Operação cancelada pelo usuário.");
      return true;
    }

    this.serviceParticipante.buscaParticipanteCodCarteirinha(this.cod.text).subscribe(
      (dados) => {
        if (!dados)
          this.toastMessage("Usuario não encontrado!");
        this.navCtrl.push(ConfirmacaoPresencaPage.name, { usuario: dados, eventoId: eventoId });
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401)
          this.toastMessage("Usuário não logado.");
        else {
          this.toastMessage(err.error.Message)
        }
      }
    )

  }


  logout() {
    this.tokem.removeToken();
    this.tokem.removeUser();
    this.navCtrl.setRoot(LoginPage.name);
  }

  toastMessage(mensagem: string) {
    return this.toast.create({
      message: mensagem,
      position: "botton",
      duration: 5000
    }).present();
  }

}
