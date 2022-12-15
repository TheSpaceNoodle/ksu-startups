export interface User {
  displayName: string;
  email: string;
  photoUrl?: string;
  uid: string;
  metadata: UserMetadata;
  error: string | null;
}

interface UserMetadata {
  createdAt: Date;
  lastSignIn: Date;
}
