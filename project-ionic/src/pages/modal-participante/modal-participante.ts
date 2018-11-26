import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Participante } from '../../models/participante';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { ParticipanteProvider, ConfirmacaoPresenca } from '../../providers/participante/participante';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-modal-participante',
  templateUrl: 'modal-participante.html',
})
export class ModalParticipantePage {

  private cod: BarcodeScanResult;
  private participante: Participante;
  private confirmacaoPresenca: ConfirmacaoPresenca;
  private idEvento;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertController,
    private barcode: BarcodeScanner,
    private tokem: LoginProvider,
    private toast: ToastController,
    private serviceParticipante: ParticipanteProvider) {
  }

  ionViewDidLoad() {
    this.idEvento = this.navParams.get('idEvento');
    this.scan();
  }

  async scan() {
    await this.barcode.scan()
      .then((codBarra) => {
        this.cod = codBarra
        let alert = this.alert.create({
          title: 'Aviso',
          subTitle: 'Código escaneado: ' + this.cod.text,
          message: 'Correto?',
          buttons: [
            {
              text: 'Sim',
              handler: () => {
                this.serviceParticipante.buscaParticipanteCodCarteirinha(this.cod.text).subscribe(
                  (dados) => {
                    if (!dados)
                      return this.toastMessage("Usuário não encontrado.");

                    this.participante = new Participante();
                    this.participante = dados;
                  });
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

  confirmaPresencaParticipante() {
    this.confirmacaoPresenca = new ConfirmacaoPresenca();
    this.confirmacaoPresenca.UsuarioId = this.participante.Id;
    this.confirmacaoPresenca.EventoId = this.idEvento;

    this.serviceParticipante.confirmaPresenca(this.confirmacaoPresenca).subscribe(
      () => {

        let resultado = "Presença do(a) " + this.participante.Usuario.Nome + " confirmada com sucesso."
        this.alert.create({
          title: "Aviso",
          subTitle: resultado,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.alert.create({
                  title: "Aviso",
                  buttons: [
                    {
                      text: 'Encerrar confirmação de presença',
                      handler: () => {
                        this.navCtrl.pop();
                      }
                    },
                    {
                      text: 'Nova Leitura',
                      handler: () => {
                        this.scan();

                      }
                    }
                  ]
                }).present();
              }
            }
          ]
        }).present();
      },
      (err: HttpErrorResponse) => {

        let resultado = err.error.Message;
        this.alert.create({
          title: "Aviso",
          message: resultado,
          buttons: [
            {
              text: 'Encerrar confirmação de presença',
              handler: () => {
                this.navCtrl.pop();
              }
            },
            {

              text: 'Nova Leitura',
              handler: () => {
                this.scan();
              }
            }
          ]
        }).present();
      }
    );
  }

  cancelar() {
    this.navCtrl.pop();
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
