import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Autenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter();

  public mensagemErro: string = '';

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {   
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    )
      .then((retorno) => {
        this.mensagemErro = retorno;
      })
  }
}
