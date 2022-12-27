import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { take } from 'rxjs';
import { User } from '../state';
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

  async setUserData(userData: User, userDataInput: firebase.User) {
    let exists = await this.fs.doUserExists(userDataInput.uid);
    if (userDataInput && !exists) {
      if (
        userDataInput.displayName &&
        userDataInput.email &&
        userDataInput.photoURL
      )
        userData = {
          displayName: userDataInput.displayName,
          email: userDataInput.email,
          photoURL: userDataInput.photoURL,
          uid: userDataInput.uid,
        };
      this.fs.setUserData(userDataInput.uid, userData);
      console.log('set');
    } else if (userDataInput && exists) {
      this.fs
        .getUserData(userDataInput.uid)
        .pipe(take(1))
        .subscribe((data) => (data ? (userData = data) : ''));
      console.log('get');
    }
    return userData;
  }

  login() {
    // dont forget to rewrite db usage rules to restrict access from outer domains
    let userUid = '';
    let userData: User;
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (data) => {
        if (data.user?.uid) {
          const userDataInput = data.user;
          userUid = data.user.uid;
          userData = await this.setUserData(userData, userDataInput);
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
