import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const redirectLoggedInToStartups = () => redirectLoggedInTo(['startups']);
// const redirectUnathorizedToHome = () => redirectUnauthorizedTo(['startups']); ?

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
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToStartups },
  },
  {
    path: 'startups',
    loadChildren: () =>
      import('./pages/startups-page/startups-page.module').then(
        (m) => m.StartupsPageModule
      ),
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
  {
    path: 'submit-startup',
    loadChildren: () =>
      import('./pages/submit-startup-page/submit-startup-page.module').then(
        (m) => m.SubmitStartupPageModule
      ),
    canActivate: [AngularFireAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
