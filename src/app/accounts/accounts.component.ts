import {Component, OnInit} from '@angular/core';
import {AccountsService} from '../services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accountsService
      .getUserAccounts('xDyp1q5wGHNWlVoAEMD20XFKGsW2')
      .subscribe((accounts) => {
        console.log(accounts);
      });
  }
}
