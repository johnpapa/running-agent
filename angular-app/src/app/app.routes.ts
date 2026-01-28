import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthCallbackComponent } from './features/auth/auth-callback/auth-callback.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/login' }
];

