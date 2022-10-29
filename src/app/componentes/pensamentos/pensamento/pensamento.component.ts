import { PensamentoService } from './../pensamento.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from './pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I love Angular',
    autoria: 'Nay',
    modelo: 'modelo3',
    favorito: false
  }

  @Input () listaFavoritos: Pensamento[] = [];

  constructor(
    private service: PensamentoService,


    ) { }

  ngOnInit(): void {
  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(): string{
    if(this.pensamento.favorito == false){
      return 'inativo'
    }
    return 'ativo'
  }
  atualizarFavoritos(){
    this.service.mudarFavorito(this.pensamento).subscribe(()=>{
      console.log("antes de atualizar:" + this.listaFavoritos.length)
        this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento),1)
        console.log("depois:" + this.listaFavoritos.length)
    });

  }

}
