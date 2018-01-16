import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from '../autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //decora o atributo com o valor que veio do componente filho
  @ViewChild('publicacoes') public publicacoes: any;

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {
  }

  public sair(): void {
    this.autenticacao.sair();
  }

  public atualizarTimeLine(): void {
    //chama o método la do component publicacoes
    this.publicacoes.atualizarTimeLine();
  }

}
