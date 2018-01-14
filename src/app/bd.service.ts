import * as firebase from 'firebase';

export class Bd {
    public publicar(publicacao: any): void {

        console.log(publicacao);

        let nomeImagem = Date.now(); //cria um nome pra imagem baseado em timestamp

        //envia a imagem para o storage do firebase
        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)

        //insere um novo dados no path publicacao/email_criptografado
        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        //     .push({ titulo: publicacao.titulo });
    }
}