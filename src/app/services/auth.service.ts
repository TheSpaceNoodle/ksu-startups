import { Injectable } from '@angular/core';
import { deleteUser, getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly auth: AngularFireAuth) {}

  login() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data) => {
        const user = getAuth().currentUser;
        if (user) {
          if (!data.user?.email?.includes('@ksu.ks.ua')) {
            deleteUser(user).then(() => {
              console.log('no access for this domain');
            });
          } else {
          }
        }
      });
  }

  logout() {
    this.auth.signOut();
  }
}
