import { Agenda } from "./agenda";
import { Funcionario } from "./funcionario";

export class Evento {

    Id: number;
    Nome: string;
    Descricao: string;
    Local: string;
    DataInicio: string;
    DataEncerramento: string;
    Apresentador: string
    CargaHoraria: string;
    NumeroVagas: number;
    PathImagem: string;
    TipoEvento: string;
    AgendaEventoId: number;

    AgendaEvento: Agenda;

    funcionario: Funcionario[];
}