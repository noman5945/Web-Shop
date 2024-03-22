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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  hide: boolean = true;
  retypeHide: boolean = true;
  userName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[0-9])'),
    Validators.minLength(6),
  ]);
  retypePassword = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[0-9])'),
    Validators.minLength(6),
  ]);
  onSubmit(): void {
    if (this.password.value != this.retypePassword.value) {
      alert('Password mismatch');
      return;
    }
    if (
      this.password.value == '' ||
      this.retypePassword.value == '' ||
      this.email.value == '' ||
      this.userName.value == ''
    ) {
      alert('Some fields are empty');
      return;
    }
    this.email.reset();
    this.password.reset();
    this.retypePassword.reset();
    this.userName.reset();
  }

  getNameErrorMessage() {
    return this.userName.hasError('required') ? 'Enter a user name' : '';
  }

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
    if (this.password.hasError('pattern')) {
      return 'Password must contain a number';
    }
    return this.password.hasError('minLength')
      ? 'Password must be at least 6 characters'
      : '';
  }

  getRetypePassErrorMsg() {
    if (this.retypePassword.hasError('required')) {
      return 'You must enter a password';
    }
    if (this.retypePassword.hasError('pattern')) {
      return 'Password must contain a number';
    }
    return this.retypePassword.hasError('minLength')
      ? 'Password must be at least 6 characters'
      : '';
  }
}
