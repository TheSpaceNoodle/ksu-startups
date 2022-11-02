import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startups-page',
  templateUrl: './startups-page.component.html',
  styleUrls: ['./startups-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupsPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
