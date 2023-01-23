import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Startup } from 'src/app/shared/models/startup.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() startupData!: Startup;

  constructor() {}

  ngOnInit(): void {}
}
