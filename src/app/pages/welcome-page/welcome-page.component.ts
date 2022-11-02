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
        'Rebecca was a solo and a secondary character in Cyberpunk: Edgerunners.',
      info: 'Rebecca is a very sharp-tongued person, has a tendency to extremes and is unpredictable. She is often shown going all out in fights and in no way shying away from using violence or even killing. Nevertheless, Rebecca is a very loyal person and does everything for the crew of Maine and supports David where she can.',
      imgUrl: './assets/partner-placeholder.png',
    },
    {
      name: 'Rebecca',
      position:
        'Rebecca was a solo and a secondary character in Cyberpunk: Edgerunners.',
      info: 'Rebecca is a very sharp-tongued person, has a tendency to extremes and is unpredictable. She is often shown going all out in fights and in no way shying away from using violence or even killing. Nevertheless, Rebecca is a very loyal person and does everything for the crew of Maine and supports David where she can.',
      imgUrl: './assets/partner-placeholder.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
