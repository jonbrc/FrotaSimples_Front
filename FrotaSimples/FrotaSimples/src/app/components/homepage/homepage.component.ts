import { Component } from '@angular/core';
import { PoSlideItem } from '@po-ui/ng-components';
import { PoChartModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  slides: Array<PoSlideItem> = [
    { image: '../../../assets/imagens/BannerFrotaSimples.png' }

  ];
}
