import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AdminProvider } from '../../providers/admin/admin';
import { Evento } from '../../models/evento';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { ConfirmacaoPresencaPage } from '../confirmacao-presenca/confirmacao-presenca';
import { ParticipanteProvider } from '../../providers/participante/participante';
import { HttpErrorResponse } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  cod: BarcodeScanResult;
  private eventos: Evento[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    private toast: ToastController,
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

    /*  await this.barcode.scan()
       .then((codBarra) => { this.cod = codBarra })
       .catch((err: Error) => {
         this.toastMessage(err.message);
       });
 
     if (this.cod.cancelled == true) {
       this.toastMessage("Operação cancelada pelo usuário.");
       return true;
     } */

    this.serviceParticipante.buscaParticipanteCodCarteirinha("015000002665").subscribe(
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

  toastMessage(mensagem: string) {
    return this.toast.create({
      message: mensagem,
      position: "botton",
      duration: 5000
    }).present();
  }
}
