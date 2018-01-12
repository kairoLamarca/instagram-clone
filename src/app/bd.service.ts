import * as firebase from 'firebase';

export class Bd {
    public publicar(publicacao: any): void {

        //insere um novo dados no path publicacao/email_criptografado
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo });
    }
}