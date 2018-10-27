import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Evento } from '../../models/evento';
import { ParticipanteProvider, ConfirmacaoPresenca } from '../../providers/participante/participante';
import { HttpErrorResponse } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-participante',
  templateUrl: 'participante.html',
})
export class ParticipantePage {

  private eventos: Evento[];
  private IdUsuario;
  private confirmaPresenca: ConfirmacaoPresenca;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: ParticipanteProvider,
    private toast: ToastController,
    private alert: AlertController) {
  }

  ionViewDidLoad() {
    this.IdUsuario = this.navParams.get('id');

    this.service.buscaEventosIncritos(this.IdUsuario).subscribe(
      (data: Evento[]) => {
        this.eventos = data
      },
      (err) => {
        console.log(err);
      }
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

    this.service.buscaParticipanteCodCarteirinha("015000002665").subscribe(
      (dados) => {
        if (!dados)
          return this.toastMessage("Usuario não encontrado!");
          
        if (dados.Id != this.IdUsuario)
          return this.alertMensagem("Usuário encontrado é diferente do usuário que está logado. Por favor utilize seu código da carterinha estudantil")

        this.confirmaPresenca = new ConfirmacaoPresenca();
        this.confirmaPresenca.EventoId = eventoId;
        this.confirmaPresenca.UsuarioId = dados.Id;

        this.service.confirmaPresenca(this.confirmaPresenca).subscribe(
          () => {
            let resultado = "Presença do(a) " + dados.Usuario.Nome + " confirmada com sucesso."
            return this.alertMensagem(resultado);
          },
          (err: HttpErrorResponse) => {
            return this.alertMensagem(err.error.Message)
          }
        );

      },
      (err: HttpErrorResponse) => {
        if (err.status == 401)
          return this.toastMessage("Usuário não logado.");
        else {
          return this.toastMessage(err.error.Message)
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

  alertMensagem(mensagem: string) {
    return this.alert.create({
      title: "Aviso.",
      message: mensagem,
      buttons:["OK"]
    }).present();
  }
}
