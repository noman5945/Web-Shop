import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide: boolean = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    //Validators.pattern('^(?=[a-zA-Z])(?=[^0-9]*[0-9])+$'),
    Validators.minLength(6),
  ]);
  errorAuth: string | null = null;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPassErrorMsge() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }
    /*
    pattern="^(?=[a-zA-Z])(?=[^0-9]*[0-9])+$"
    if (this.password.hasError('pattern')) {
      return 'Password must contain at least a number';
    }
    */
    return this.password.hasError('minLength')
      ? ''
      : 'Password must be at least 6 characters';
  }

  constructor(private _authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.email.value == '' || this.password.value == '') {
      alert('Some fields are empty');
      return;
    }
    this._authService
      .accountLogin(this.email.value || '', this.password.value || '')
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.errorAuth = err.code;
        },
      });

    this.email.reset();
    this.password.reset();
  }
}
