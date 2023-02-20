import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable, take } from 'rxjs';
import { Partner } from 'src/app/shared/models/partner.model';
import { Startup } from 'src/app/shared/models/startup.model';
import { User } from 'src/app/shared/models/user.model';

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

  setUserData(uid: string, user: User): void {
    this.afStore.doc<User>(`users/${uid}`).set(user);
  }

  getUserData(uid: string): Observable<User | null> {
    this.uid = uid;
    return this.afStore
      .doc<User>(`users/${uid}`)
      .valueChanges()
      .pipe(map((data) => (data ? data : null)));
  }

  doUserExists(uid: string): Observable<boolean> {
    return this.getUserData(uid).pipe(
      take(1),
      map((data) => (data ? true : false))
    );
  }

  submitStartup(startupData: Startup, file: File): void {
    const refUrl = `startupsToApprove/${this.uid}/${startupData.startupName}/${file.name}`;
    this.afStorage.upload(refUrl, file).then(() => {
      this.afStorage
        .ref(refUrl)
        .getDownloadURL()
        .pipe(take(1))
        .subscribe((imageUrl) => {
          startupData = {
            ...startupData,
            startupImage: imageUrl,
          };
          this.afStore
            .doc<Startup>(
              `startupsToApprove/${this.uid + '|' + startupData.startupName}`
            )
            .set(startupData);
        });
    });
  }

  getAllStartups(): Observable<Startup[]> {
    this.startupsQuery$ = this.afStore
      .collection<Startup>('startups')
      .valueChanges({ idField: 'docId' });

    return this.startupsQuery$;
  }

  getPartners(): Observable<Partner[]> {
    return this.afStore.collection<Partner>('partners').valueChanges();
  }
}
