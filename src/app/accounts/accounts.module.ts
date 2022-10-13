import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';

import {AccountsRoutingModule} from './accounts-routing.module';
import {AccountsComponent} from './accounts.component';
import {NewAccountComponent} from './new-account/new-account.component';

@NgModule({
  declarations: [AccountsComponent, NewAccountComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
})
export class AccountsModule {}
