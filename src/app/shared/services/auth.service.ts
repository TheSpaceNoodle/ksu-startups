import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { concatMap, from, Observable, of, take } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly auth: AngularFireAuth,
    private fsService: FirestoreService,
    private router: Router
  ) {}

  checkSignedUser(): Observable<User | null> {
    const userStream = this.auth.user;

    return userStream.pipe(
      concatMap((data) =>
        data && data.uid ? this.fsService.getUserData(data.uid) : of(null)
      )
    );
  }

  setUserData(userDataInput: firebase.User): void {
    this.fsService
      .doUserExists(userDataInput.uid)
      .pipe(take(1))
      .subscribe((exists) => {
        if (
          userDataInput &&
          !exists &&
          userDataInput.displayName &&
          userDataInput.email &&
          userDataInput.photoURL
        )
          this.fsService.setUserData(userDataInput.uid, {
            displayName: userDataInput.displayName,
            email: userDataInput.email,
            photoURL: userDataInput.photoURL,
            uid: userDataInput.uid,
            roles: ['user'],
            activeRole: 'user',
          });
      });
  }

  login(): Observable<User | null> {
    return from(
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    ).pipe(
      take(1),
      concatMap((data) => {
        if (data.user) {
          this.setUserData(data.user);
        }
        this.router.navigateByUrl('/startups');
        return this.fsService.getUserData(data.user?.uid as string);
      })
    );
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }
}
