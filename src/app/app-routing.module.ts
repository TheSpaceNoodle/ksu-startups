import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome-page/welcome-page.module').then(
        (m) => m.WelcomePageModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth-page/auth-page.module').then(
        (m) => m.AuthPageModule
      ),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: !loggedIn },
  },
  {
    path: 'startups',
    loadChildren: () =>
      import('./pages/startups-page/startups-page.module').then(
        (m) => m.StartupsPageModule
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
