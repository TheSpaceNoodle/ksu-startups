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
  {
    path: 'startups/:id',
    loadChildren: () =>
      import('./pages/startup-page/startups-page.module').then(
        (m) => m.StartupsPageModule
      ),
  },
  {
    path: 'partners',
    loadChildren: () =>
      import('./pages/partners-page/partners-page.module').then(
        (m) => m.PartnersPageModule
      ),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./pages/contacts-page/contacts-page.module').then(
        (m) => m.ContactsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
