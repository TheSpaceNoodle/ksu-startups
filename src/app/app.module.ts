import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { StartupsPageComponent } from './pages/startups-page/startups-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { PartnersPageComponent } from './pages/partners-page/partners-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { SubmitStartupPageComponent } from './pages/submit-startup-page/submit-startup-page.component';
import { NavComponent } from './components/nav/nav.component';
import { CardComponent } from './components/card/card.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    StartupsPageComponent,
    ContactsPageComponent,
    PartnersPageComponent,
    AuthPageComponent,
    SubmitStartupPageComponent,
    NavComponent,
    CardComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
