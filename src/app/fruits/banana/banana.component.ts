import { Component } from '@angular/core';
import { FruitComponent } from '../fruit.component';


@Component({
  selector: 'app-banana',
  templateUrl: './banana.component.html'
})
export class BananaComponent extends FruitComponent {
  getName(): string {
    return 'Banana';
  }
}
