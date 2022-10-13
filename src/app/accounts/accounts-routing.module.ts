import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsComponent} from './accounts.component';
import {NewAccountComponent} from './new-account/new-account.component';

const routes: Routes = [
  {path: '', component: AccountsComponent},
  {path: 'new', component: NewAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
