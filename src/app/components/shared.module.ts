import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { PartnerComponent } from './partner/partner.component';

@NgModule({
  declarations: [CardComponent, PartnerComponent],
  imports: [CommonModule],
  exports: [CardComponent, PartnerComponent],
})
export class SharedModule {}
