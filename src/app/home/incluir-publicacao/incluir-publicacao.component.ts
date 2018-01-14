import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';

import { Bd } from '../../bd.service';
import { Progresso } from '../../progresso.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})

export class IncluirPublicacaoComponent implements OnInit {

  public email: string;
  private imagem: any;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    let acompanhamentoUpload = Observable.interval(1500);

    //subject serve para submiter valores para o observable
    let continua = new Subject

    continua.next(true);

    acompanhamentoUpload
      .takeUntil(continua)//ir até enquanto
      .subscribe(() => {
        //vai executar a cada 1,5 segundos
        console.log(this.progresso.status);
        console.log(this.progresso.estado);

        if (this.progresso.status === 'concluido') {
          continua.next(false);
        }
      })

    // console.log(this.progresso.status);
    // console.log(this.progresso.estado);
  }

  public preparaImagemUpload(event: Event): void {
    //tipagem do event para um html para poder recuperar o files
    console.log((<HTMLInputElement>event.target).files);

    this.imagem = (<HTMLInputElement>event.target).files;
  }

}
