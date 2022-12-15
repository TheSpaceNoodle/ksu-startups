import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly auth: AngularFireAuth,
    private afs: AngularFirestore
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
