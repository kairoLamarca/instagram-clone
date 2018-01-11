import { Component, OnInit, EventEmitter, Output, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from '../usuario.model';

import { Autenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
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
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public mensagemErro: string = '';

  public erro: string = 'semErro';

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'nome_completo': new FormControl(null, [Validators.required]),
    'nome_usuario': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private autenticao: Autenticacao
  ) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario() {
    //console.log(this.formulario);

    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    );

    this.autenticao.cadastrarUsuario(usuario)
      .then((retorno) => { 
        if (retorno) {
          this.erro = 'comErro';
          this.mensagemErro = retorno;
        }else{
          this.exibirPainelLogin()
        }
      });
  }

  public fimDaAnimacao(): void {
    this.erro = 'semErro';
  }
}
