import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { PartnerComponent } from './partner/partner.component';

@NgModule({
  declarations: [CardComponent, PartnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [CardComponent, PartnerComponent],
})
export class SharedModule {}
