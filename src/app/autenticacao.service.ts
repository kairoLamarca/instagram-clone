import { Usuario } from './acesso/usuario.model';

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): void {
        console.log('ta aqui', usuario);
    }
}