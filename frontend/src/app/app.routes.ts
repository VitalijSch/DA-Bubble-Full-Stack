import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ChooseAvatarComponent } from './auth/choose-avatar/choose-avatar.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signin', component: SigninComponent },
            { path: 'choose-avatar', component: ChooseAvatarComponent },
        ]
    },
];
