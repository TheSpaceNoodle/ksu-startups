import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { firstValueFrom, Observable, take } from 'rxjs';
import { Startup, User } from '../state';
import { Partner } from '../state/partners/partners.reducer';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  startupsQuery$!: Observable<Startup[]>;
  uid!: string;

  constructor(
    private afStore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  setUserData(uid: string, user: User) {
    this.afStore.doc<User>(`users/${uid}`).set(user);
  }

  getUserData(uid: string) {
    this.uid = uid;
    return this.afStore.doc<User>(`users/${uid}`).valueChanges();
  }

  async doUserExists(uid: string) {
    let userExists = false;
    await firstValueFrom(this.getUserData(uid).pipe(take(1))).then((data) => {
      userExists = data !== undefined;
    });
    return userExists;
  }

  submitStartup(startupData: Startup, file: File) {
    const refUrl = `startupsToApprove/${this.uid}/${startupData.startupName}/${file.name}`;
    this.afStorage.upload(refUrl, file).then(() => {
      firstValueFrom(this.afStorage.ref(refUrl).getDownloadURL()).then(
        (imageUrl) => {
          startupData = {
            ...startupData,
            authorUid: this.uid,
            startupImage: imageUrl,
          };
          this.afStore
            .doc<Startup>(
              `startupsToApprove/${this.uid + '|' + startupData.startupName}`
            )
            .set(startupData);
        }
      );
    });
  }

  getAllStartups() {
    this.startupsQuery$ = this.afStore
      .collection<Startup>('startups')
      .valueChanges({ idField: 'docId' });

    return this.startupsQuery$;
  }

  getPartners() {
    return this.afStore.collection<Partner>('partners').valueChanges();
  }
}
