import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { firstValueFrom } from 'rxjs';
import { User } from '../state';
import { FirestoreService } from './firestore.service';

// TODO:
// add check to the database if the user is in it
// if user is not in the db && his domain is not rescticted => add user to the db
// otherwise => do nothing

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserUid: string | null = null;

  constructor(
    private readonly auth: AngularFireAuth,
    private fs: FirestoreService
  ) {}

  async checkSignedUser(): Promise<User | null> {
    return firstValueFrom(this.auth.user).then(async (data) => {
      if (data && data.uid) {
        return (await firstValueFrom(this.fs.getUserData(data.uid))) as User;
      }
      return null;
    });
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
          roles: [],
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
          userUid = data.user.uid;
          await this.setUserData(data.user);
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
