import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { firstValueFrom, Observable } from 'rxjs';
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

  checkSignedUser(): Observable<firebase.User | null> {
    return this.auth.user;
  }

  async setUserData(userDataInput: firebase.User) {
    let exists = await this.fs.doUserExists(userDataInput.uid);
    if (userDataInput && !exists) {
      if (
        userDataInput.displayName &&
        userDataInput.email &&
        userDataInput.photoURL
      )
        this.fs.setUserData(userDataInput.uid, {
          displayName: userDataInput.displayName,
          email: userDataInput.email,
          photoURL: userDataInput.photoURL,
          uid: userDataInput.uid,
        });
    }
  }

  login() {
    // dont forget to rewrite db usage rules to restrict access from outer domains
    let userUid = '';
    return this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (data) => {
        if (data.user?.uid) {
          const userDataInput = data.user;
          userUid = data.user.uid;
          await this.setUserData(userDataInput);
        }
        return (await firstValueFrom(this.fs.getUserData(userUid))) as User;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  logout() {
    this.auth.signOut();
  }
}
