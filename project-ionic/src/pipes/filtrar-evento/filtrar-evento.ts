import { Pipe, PipeTransform } from '@angular/core';
import { Evento } from '../../models/evento';

@Pipe({
  name: 'filtrarEvento',
})
export class FiltrarEventoPipe implements PipeTransform {

  transform(eventos: Evento[], value: string) {
    
    if (!value) return eventos;

    return eventos.filter( evento => { return evento.Nome.toLowerCase().includes(value.toLowerCase()) })
  }
}
