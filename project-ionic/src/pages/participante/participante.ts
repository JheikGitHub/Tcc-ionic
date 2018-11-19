import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Evento } from '../../models/evento';
import { ParticipanteProvider, ConfirmacaoPresenca } from '../../providers/participante/participante';
import { HttpErrorResponse } from '@angular/common/http';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-participante',
  templateUrl: 'participante.html',
})
export class ParticipantePage {


  private eventos: Evento[];
  private IdUsuario;
  private cod: BarcodeScanResult;
  private confirmaPresenca: ConfirmacaoPresenca;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: ParticipanteProvider,
    private tokem: LoginProvider,
    private toast: ToastController,
    private barcode: BarcodeScanner,
    private alert: AlertController) {
  }

  ionViewDidLoad() {
    this.IdUsuario = this.navParams.get('id');
  }

  async scan() {
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
                this.confirmaPresenca = new ConfirmacaoPresenca();
                //troca idEvento por codigo escaniado
                this.confirmaPresenca.EventoId = parseInt(this.cod.text);
                this.confirmaPresenca.UsuarioId = this.IdUsuario;

                this.service.confirmaPresenca(this.confirmaPresenca).subscribe(
                  () => {
                    return this.alertMensagem("Presença confirmada com sucesso.");
                  },
                  (err: HttpErrorResponse) => {
                    return this.alertMensagem(err.error.Message)
                  }
                );
              }
            },
            {
              text: 'Não',
              handler: () => {
                this.scan();
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

  alertMensagem(mensagem: string) {
    return this.alert.create({
      title: "Aviso.",
      message: mensagem,
      buttons: ["OK"]
    }).present();
  }
}
