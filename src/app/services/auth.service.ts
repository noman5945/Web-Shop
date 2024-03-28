import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user,
  signOut,
} from '@angular/fire/auth';
import { CurrentUser, User } from '../models/user.model';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  router = inject(Router);
  /**
   * Create an observable of user state. The observer is triggered for sign-in, sign-out, and token refresh events
   */
  user$ = user(this.firebaseAuth);
  /**
   * user signal is tracked at main app component
   * If there is user then "User" interface
   * If no user then null
   * At the beginning of async work the value is undefined
   */
  currentUserSignal = signal<CurrentUser | null | undefined>(undefined);
  constructor() {}

  createNewAccount(user: User): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      user.email,
      user.password
    )
      .then((response) =>
        updateProfile(response.user, { displayName: user.username })
      )
      .catch((error) => {
        alert(error);
      });

    return from(promise);
  }

  accountLogin(email: string, password: string): Observable<void> {
    const loginPromise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    )
      .then(() => {})
      .catch((error) => alert(error));
    return from(loginPromise);
  }

  accountLogout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      this.router.navigateByUrl('/');
    });
    return from(promise);
  }
}
