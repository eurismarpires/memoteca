import { Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit, Output } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = []
  constructor(private service: PensamentoService,
              private router:Router
    ) { }
  paginaAtual : number = 1;

  haMaisPensamentos: boolean = true;
  filtro: string = ''
  favoritos: boolean = false;

  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural'
  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    })
  }

  carregarMaisPensamentos(){
    console.log("carregando outros pensamentos")
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {

      this.listaPensamentos.push(...listaPensamentos)
      if(!this.listaPensamentos.length){
        this.haMaisPensamentos = false
      }
    })
  }
  pesquisarPensamentos(){
    this.favoritos = false;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
     this.service.listar(this.paginaAtual,this.filtro,this.favoritos)
      .subscribe(listaPensamentos => {
         this.listaPensamentos = listaPensamentos
         console.log("pensamentos:" + this.listaPensamentos.length)
      })
  }

  listarFavoritos(){
    this.titulo = 'Meus Favoritos'
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual,this.filtro, this.favoritos)
      .subscribe(listaPensamentosFavoritos => {
         this.listaPensamentos = listaPensamentosFavoritos
         this.listaFavoritos = listaPensamentosFavoritos;
      })
  }
  recarregarComponente(){
   this.favoritos = false;
   this.paginaAtual = 1;
   this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
   this.router.onSameUrlNavigation = 'reload'
   this.router.navigate([this.router.url])
  }
}
