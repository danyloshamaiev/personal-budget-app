import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {AccountsService} from '../../services/accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
})
export class NewAccountComponent implements OnInit, OnDestroy {
  public newAccountForm: FormGroup;
  private unsubscribe$: Subject<void>;

  constructor(
    private accountsService: AccountsService,
    private router: Router
  ) {
    this.newAccountForm = new FormGroup({
      name: new FormControl(''),
      initialBalance: new FormControl<number | null>(null),
    });
    this.unsubscribe$ = new Subject<void>();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  public addNewAccount(): void {
    this.accountsService
      .addUserAccount(
        this.newAccountForm.value.name,
        this.newAccountForm.value.initialBalance
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['accounts']);
      });
  }
}
