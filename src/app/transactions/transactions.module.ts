import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';

import {TransactionsRoutingModule} from './transactions-routing.module';
import {TransactionsComponent} from './transactions.component';
import {NewTransactionComponent} from './new-transaction/new-transaction.component';

@NgModule({
  declarations: [TransactionsComponent, NewTransactionComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
  ],
})
export class TransactionsModule {}
