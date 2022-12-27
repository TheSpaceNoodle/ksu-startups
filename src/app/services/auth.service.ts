import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { AppState } from '../state/app.state';
import { FirestoreService } from './firestore.service';

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
    private store: Store<AppState>,
    private fs: FirestoreService
  ) {}

  checkSignedUser() {
    onAuthStateChanged(getAuth(), (user) => {
      console.log(user);
      // this.store.dispatch(logInSuccess({}));
    });
  }

  login() {
    // dont forget to rewrite db usage rules to restrict access from outer domains
    let userUid = '';
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data) => {
        if (data.user?.uid) {
          userUid = data.user.uid;
          if (data.user && !this.fs.doUserExists(data.user.uid)) {
            this.fs.setUserData(data.user.uid, {
              uid: data.user.uid,
              displayName: data.user.displayName,
            });
          }
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
