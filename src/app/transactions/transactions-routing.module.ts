import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionsComponent} from './transactions.component';
import {NewTransactionComponent} from './new-transaction/new-transaction.component';

const routes: Routes = [
  {path: 'new', component: NewTransactionComponent},
  {path: ':id', component: TransactionsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
