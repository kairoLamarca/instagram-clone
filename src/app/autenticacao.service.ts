import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): void {
        console.log('ta aqui', usuario);

        //Cadastrar usuário no firebase
        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                console.log(resposta);
            })
            .catch((error: Error) => {
                console.log(error);
            })
    }
}