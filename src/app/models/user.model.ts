export interface User {
  displayName: string;
  email: string;
  photoUrl?: string;
  uid: string;
  metadata: UserMetadata;
}

interface UserMetadata {
  createdAt: Date;
  lastSignIn: Date;
}
