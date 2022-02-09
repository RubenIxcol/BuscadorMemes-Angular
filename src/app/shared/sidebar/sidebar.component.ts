
import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {

//Enviar la variable por get otro lo estara escuchando
  get historial(){
  return this.giftS.historial
}

//Recibir el servicio(Iniciar el servicio)
constructor(private giftS:GifsService){}

buscar(query:string){
  this.giftS.buscarGifs(query)
}

}
