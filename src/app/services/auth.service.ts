import { Injectable } from '@angular/core';
import { setPersistence } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { AuthState, logIn } from '../state';

// TODO:
// add check to the database if the user is in it
// if user is not in the db && his domain is not rescticted => add user to the db
// otherwise => do nothing

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly auth: AngularFireAuth,
    private afs: AngularFirestore,
    private store: Store<AuthState>
  ) {}

  login() {
    // dont forget to rewrite db usage rules to restrict access from outer domains
    let userUid = '';
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data) => {
        if (data.user?.uid) {
          userUid = data.user.uid;
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
    return userUid;
  }

  logout() {
    this.auth.signOut();
  }
}
