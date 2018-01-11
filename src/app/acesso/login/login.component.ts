import { Component, OnInit, EventEmitter, Output, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Autenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('erro', [
      transition('semErro => comErro', [        
        animate('1.5s 0s ease-in-out', keyframes([          
          style({ offset: 0.08, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.10, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.12, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.14, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.16, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.18, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 1, opacity: 1, transform: 'translateX(0)' })
        ])) 
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter();

  public mensagemErro: string = '';

  public erro: string = 'semErro';

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
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
        if(retorno){
          this.erro = 'comErro';
          this.mensagemErro = retorno;          
        }
      })
  }

  public fimDaAnimacao(): void {
    this.erro = 'semErro';
  }
}
