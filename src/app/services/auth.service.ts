import { Injectable, inject } from '@angular/core';
import {
  Auth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
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
}
