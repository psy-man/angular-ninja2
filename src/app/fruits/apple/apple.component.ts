import { Component } from '@angular/core';
import { FruitComponent } from '../fruit.component';


@Component({
  selector: 'app-apple',
  templateUrl: './apple.component.html'
})
export class AppleComponent extends FruitComponent {
  getName(): string {
    return 'Apple';
  }

  public ngOnInit(): void {
    super.ngOnInit();

    console.log(this.getName());
  }
}
