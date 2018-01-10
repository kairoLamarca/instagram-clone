import { CanActivate } from '@angular/router'

export class AutenticacaoGuard implements CanActivate {
    canActivate(): boolean {
        //canActivate sempre precisa retornar true ou false
        //Aqui tem a lógica para saber se a rota pode ou nao ser liberada para o usuario atual
        return true;
    }
}