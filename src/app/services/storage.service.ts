import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private afs: AngularFireStorage) {}

  upload(file: File) {
    this.afs.upload(`startupsToApprove/${file.name}`, file);
  }
}
