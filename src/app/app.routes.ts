import { Routes } from '@angular/router';

import { AcessoComponent } from './acesso/acesso.component';
import { HomeComponent } from './home/home.component';

import { AutenticacaoGuard } from './autenticacao-guard.service'; //precisar estar configurado como provider no app.module

export const ROUTES: Routes = [
    { path: '', component: AcessoComponent },
    { path: 'home', component: HomeComponent, canActivate: [AutenticacaoGuard] } //canActivate é para chamar as classes de autenticacao para proteger a rota
]