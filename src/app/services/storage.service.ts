import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private afs: AngularFireStorage) {}

  upload(file: File, uid: string, startupName: string) {
    const refUrl = `startupsToApprove/${uid}/${startupName}/${file.name}`;
    this.afs.upload(refUrl, file);

    return firstValueFrom(this.afs.ref(refUrl).getDownloadURL());
  }
}
