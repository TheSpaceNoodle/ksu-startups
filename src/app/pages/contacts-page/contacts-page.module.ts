import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContactsPageRoutingModule } from './contacts-page-routing.module';
import { ContactsPageComponent } from './contacts-page.component';

@NgModule({
  declarations: [ContactsPageComponent],
  imports: [CommonModule, ContactsPageRoutingModule],
})
export class ContactsPageModule {}
