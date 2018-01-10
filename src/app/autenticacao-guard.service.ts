import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Autenticacao } from './autenticacao.service';//importando o serviço que esta no providers, ou seja, não está estanciando denovo

//Injectable para injetar um serviço nesse serviço
@Injectable()
export class AutenticacaoGuard implements CanActivate {

    constructor(private autenticacao: Autenticacao) { }
    canActivate(): boolean {
        //canActivate sempre precisa retornar true ou false
        //Aqui tem a lógica para saber se a rota pode ou nao ser liberada para o usuario atual
        return this.autenticacao.autenticado();
    }
}