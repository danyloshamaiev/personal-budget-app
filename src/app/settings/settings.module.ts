import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';

import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    CalendarModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    RippleModule,
    FormsModule,
  ],
})
export class SettingsModule {}
