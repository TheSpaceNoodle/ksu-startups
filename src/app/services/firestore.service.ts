import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom, take } from 'rxjs';
import { User } from '../state';

// create a base function to retrieve data
// create a separated functions to retrieve data from collections and storages using base function

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private readonly afs: AngularFirestore) {}

  setUserData(uid: string, user: User) {
    this.afs.doc<User>(`users/${uid}`).set(user);
  }

  getUserData(uid: string) {
    return this.afs.doc<User>(`users/${uid}`).valueChanges();
  }

  async doUserExists(uid: string) {
    let userExists = false;
    await firstValueFrom(this.getUserData(uid).pipe(take(1))).then((data) => {
      userExists = data != undefined;
    });
    return userExists;
  }
}
