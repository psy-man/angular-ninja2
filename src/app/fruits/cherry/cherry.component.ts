import { Component } from '@angular/core';
import { FruitComponent } from '../fruit.component';


@Component({
  selector: 'app-cherry',
  templateUrl: './cherry.component.html'
})
export class CherryComponent extends FruitComponent {
  constructor() {
    super();
  }
}
