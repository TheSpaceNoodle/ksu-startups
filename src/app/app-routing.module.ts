import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/welcome-page/welcome-page.module').then(
        (m) => m.WelcomePageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth-page/auth-page.module').then(
        (m) => m.AuthPageModule
      ),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: !loggedIn },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
