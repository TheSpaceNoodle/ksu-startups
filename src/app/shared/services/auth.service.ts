import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly auth: AngularFireAuth,
    private fs: FirestoreService,
    private router: Router
  ) {}

  async checkSignedUser(): Promise<User | null> {
    return firstValueFrom(this.auth.user).then(async (data) => {
      if (data && data.uid) {
        return (await firstValueFrom(this.fs.getUserData(data.uid))) as User;
      }
      return null;
    });
  }

  async setUserData(userDataInput: firebase.User): Promise<void> {
    const exists = await this.fs.doUserExists(userDataInput.uid);
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
          roles: ['user'],
          activeRole: 'user',
        });
    }
  }

  login(): Promise<User> {
    let userUid = '';
    return this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (data) => {
        if (data.user?.uid) {
          userUid = data.user.uid;
          await this.setUserData(data.user);
        }
        this.router.navigateByUrl('/startups');
        return (await firstValueFrom(this.fs.getUserData(userUid))) as User;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  logout() {
    return this.auth.signOut();
  }
}
