import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        console.log('ta aqui', usuario);

        //Cadastrar usuário no firebase na dimensão de autenticação
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                //remover a senha do atributo senha do objeto usuario
                delete usuario.senha

                //ref() referencia de onde vai criar o registro
                //btoa -- converte a string em, base64
                //push adiciona um novo documento
                //set, apaga tudo e insere só um
                //registrando dados complementares do usuario no path email base64 na dimensão de database
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    //.push
                    .set(usuario)

            })
            .catch((error: Error) => {
                console.log(error);
            })
    }

    public autenticar(email: string, senha: string): void {
        console.log('email: ', email);
        console.log('senha: ', senha);
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => console.log(resposta))
            .catch((error: Error) => console.log(error))
    }
}