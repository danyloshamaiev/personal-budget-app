import {NgModule} from '@angular/core';
import {AuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {RouterModule, Routes} from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./accounts/accounts.module').then((m) => m.AccountsModule),
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: '',
    redirectTo: '/accounts',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
