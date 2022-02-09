import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //permite que el servicio se global
})
export class GifsService {

  private apiKey:string = '28VkNHMXRD6vCG5OUHISKEOsWCfg04i0';
  private servicioUrl: string ='https://api.giphy.com/v1/gifs' 
  private _historial:string[]=[];

  public resultado:gif[]=[];


  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado= JSON.parse(localStorage.getItem('resultado')!) || [];
   
      //estamaera tambien funciona ---------
    //if(localStorage.getItem('resultado')){
   // this.resultado = JSON.parse(localStorage.getItem('resultado')!);
   // }

  }



  buscarGifs(query:string){
    query = query.toLocaleLowerCase().trim();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    console.log(this._historial)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limited', '10')
      .set('q', query);
    
   
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp) =>{
       this.resultado = resp.data;
      localStorage.setItem('resultado', JSON.stringify(this.resultado));
      });



  }

}
