import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';
import { concat } from 'rxjs/operator/concat';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any): void {

        //insere um novo dados no path publicacao/email_criptografado
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {
                let nomeImagem = resposta.key; //cria um nome pra imagem baseado na key do documento inserido

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
            }
            )
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        //criando uma promise para retornar o valor
        return new Promise((resolve, reject) => {

            //consultar as publicações (database)
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                //.on()//cria um listener, qualquer mudança no path, ele é notificado
                .once('value')
                .then((snapshot: any) => {
                    //console.log(snapshot.val());

                    let publicacoes: Array<any> = [];

                    snapshot.forEach((childSnapshot: any) => {

                        let publicacao = childSnapshot.val();

                        //consultar a url da imagem (storage)
                        firebase.storage().ref()
                            .child(`imagens/${childSnapshot.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                //console.log(url);
                                publicacao.url_imagem = url;

                                //consultar o nome do usuario
                                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                    .once('value')//faz a chamada
                                    .then((snapshot: any) => {
                                        publicacao.nome_usuario = snapshot.val().nome_usuario;

                                        publicacoes.push(publicacao);
                                    });
                            });
                    });

                    resolve(publicacoes); //retorno da promise

                }
            );
        })
    }
}