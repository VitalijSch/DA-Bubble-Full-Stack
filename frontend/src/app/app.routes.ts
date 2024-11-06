import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            { path: 'login', component: LoginComponent },
        ]
    },
];
