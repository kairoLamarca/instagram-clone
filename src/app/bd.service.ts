import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any): void {

        let nomeImagem = Date.now(); //cria um nome pra imagem baseado em timestamp

        //envia a imagem para o storage do firebase
        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                //companhamento do processo do upload
                (snapshot: any) => {
                    this.progresso.status = 'andamento';
                    this.progresso.estado = snapshot;
                },
                (error) => {
                    this.progresso.status = 'erro';
                },
                () => {
                    //finalização do processo
                    this.progresso.status = 'concluido';
                }
            )

        //insere um novo dados no path publicacao/email_criptografado
        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        //     .push({ titulo: publicacao.titulo });
    }
}