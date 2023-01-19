import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/components/shared.module';
import { PartnersPageRoutingModule } from './partners-page-routing.module';
import { PartnersPageComponent } from './partners-page.component';

@NgModule({
  declarations: [PartnersPageComponent],
  imports: [CommonModule, PartnersPageRoutingModule, SharedModule],
})
export class PartnersPageModule {}
