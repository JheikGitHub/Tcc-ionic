import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { Evento } from '../../models/evento';
import { AdminProvider } from '../../providers/admin/admin';
import { ParticipanteProvider } from '../../providers/participante/participante';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { ConfirmacaoPresencaPage } from '../confirmacao-presenca/confirmacao-presenca';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  private cod: BarcodeScanResult;
  private eventos: Evento[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    private toast: ToastController,
    private alert: AlertController,
    private tokem: LoginProvider,
    private serviceParticipante: ParticipanteProvider,
    private adminService: AdminProvider) {
  }

  ionViewDidLoad() {
    this.adminService.buscaTodosEventos().subscribe(
      (dados: Evento[]) => { this.eventos = dados },
      (err) => { console.log(err) }
    );
  }

  async scan(eventoId) {

    await this.barcode.scan()
      .then((codBarra) => {
        this.cod = codBarra
        let alert = this.alert.create({
          title: 'Aviso',
          subTitle: 'QRcode escaneado:  ' + this.cod.text,
          message: 'Correto?',
          buttons: [
            {
              text: 'Sim',
              handler: () => {

                this.serviceParticipante.buscaParticipanteCodCarteirinha(this.cod.text).subscribe(
                  (dados) => {
                    if (!dados)
                      return this.toastMessage("Usuario nao encontrado.")

                    this.navCtrl.push(ConfirmacaoPresencaPage.name, { eventoId: eventoId, participante: dados })
                  },
                  (err: HttpErrorResponse) => {
                    return this.toastMessage(err.error.Message)
                  }
                );

              }
            },
            {
              text: 'Não',
              handler: () => {
                this.scan(eventoId);
              }
            }
          ]
        });
        alert.present();
      })
      .catch((err: Error) => {
        this.toastMessage(err.message);
      });

    if (this.cod.cancelled == true) {
      this.toastMessage("Operação cancelada pelo usuário.");
      return true;
    }
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

  toastMessage(mensagem: string) {
    return this.toast.create({
      message: mensagem,
      position: "botton",
      duration: 5000
    }).present();
  }
}
