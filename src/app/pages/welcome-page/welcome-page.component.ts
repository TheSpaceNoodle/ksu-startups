import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent implements OnInit {
  partners = [
    {
      name: 'Rebecca',
      position:
        '<span class="highlight">Rebecca</span> was a solo and a secondary character in <span class="highlight">Cyberpunk: Edgerunners</span>.',
      info: '<span class="highlight">Rebecca</span> is a very sharp-tongued person, has a tendency to extremes and is unpredictable. She is often shown going all out in fights and in no way shying away from using violence or even killing. Nevertheless, Rebecca is a very loyal person and does everything for the crew of Maine and supports David where she can.',
      imgUrl: './assets/partner-placeholder.png',
    },
    {
      name: 'Rebecca',
      position:
        '<span class="highlight">Rebecca</span> was a solo and a secondary character in <span class="highlight">Cyberpunk: Edgerunners</span>.',
      info: '<span class="highlight">Rebecca</span> is a very sharp-tongued person, has a tendency to extremes and is unpredictable. She is often shown going all out in fights and in no way shying away from using violence or even killing. Nevertheless, Rebecca is a very loyal person and does everything for the crew of Maine and supports David where she can.',
      imgUrl: './assets/partner-placeholder.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
