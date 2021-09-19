import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  template: '',
  host: {
    'class': 'fruit',
    '[style.width]': `width + 'px'`,
    '[style.transform]': `'translateX(' + posX + 'px) translateY(' + posY + 'px)'`
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class FruitComponent {
  public width = 50;
  public height = 50;

  @Input() posX: number = 0;
  @Input() posY: number = -this.height;

  public get centerX() {
    return this.posX + this.width / 2;
  }

  public get centerY() {
    return this.posY + this.height / 2;
  }
}
