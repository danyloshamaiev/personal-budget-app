import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{ path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) }, { path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) }, { path: 'cash', loadChildren: () => import('./cash/cash.module').then(m => m.CashModule) }, { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
