import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom, take } from 'rxjs';
import { Startup, User } from '../state';
import { StorageService } from './storage.service';

// create a base function to retrieve data
// create a separated functions to retrieve data from collections and storages using base function

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  uid!: string;

  constructor(
    private afs: AngularFirestore,
    private storageService: StorageService
  ) {}

  setUserData(uid: string, user: User) {
    this.afs.doc<User>(`users/${uid}`).set(user);
  }

  getUserData(uid: string) {
    this.uid = uid;
    return this.afs.doc<User>(`users/${uid}`).valueChanges();
  }

  async doUserExists(uid: string) {
    let userExists = false;
    await firstValueFrom(this.getUserData(uid).pipe(take(1))).then((data) => {
      userExists = data != undefined;
    });
    return userExists;
  }

  async submitStartup(startupData: Startup, file: File) {
    const imageUrl = await this.storageService.upload(
      file,
      this.uid,
      startupData.startupName
    );
    startupData = {
      ...startupData,
      authorUid: this.uid,
      startupImage: imageUrl,
    };
    this.afs
      .doc<Startup>(
        `startupsToApprove/${this.uid + '|' + startupData.startupName}`
      )
      .set(startupData);
  }
}
