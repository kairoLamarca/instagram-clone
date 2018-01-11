import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

//@Injectable serve para injetar uma service dentro deste service
@Injectable()
export class Autenticacao {

    public token_id: string;

    constructor(private router: Router) { }

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

    public autenticar(email: string, senha: string): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken() //esse método recupera o token_id do processo de autenticação
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        localStorage.setItem('idToken', idToken); //Gravando o idToken no LocalStorage do Browser para ser recuperado depois
                        this.router.navigate(['/home']); //redirecionando para a rota /home se der certo o login
                        return '';
                    })
            })
            .catch((error: Error) => {
                console.log(error.message);
                return error.message;
            });
    }

    public autenticado(): boolean {

        if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken');//recupera a chave idToken no localStorage
        }

        if (this.token_id === undefined) {
            this.router.navigate(['/']);
        }

        return this.token_id !== undefined;
    }

    public sair(): void {
        firebase.auth().signOut()//remove o token de autenticação do firebase
            .then(() => {
                localStorage.removeItem('idToken');//remove o token do LocalStorage;
                this.token_id = undefined;
                this.router.navigate(['/']);
            })
    }
}