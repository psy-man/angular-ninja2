import { Component, OnInit, Input, ComponentRef } from '@angular/core';
import { FruitComponent } from '../fruits/fruit.component';

@Component({
  selector: 'app-shuriken',
  templateUrl: './shuriken.component.html',
  styleUrls: ['./shuriken.component.scss'],
  host: {
    '[style.transform]': `'translateX(' + posX + 'px) translateY(' + posY + 'px)'`
  }
})
export class ShurikenComponent {
  @Input() posX: number = 0;
  @Input() posY: number = 0;

  @Input() angle!: number;

  public get centerX() {
    return this.posX + this.width / 2;
  }

  public get centerY() {
    return this.posY + this.height / 2;
  }

  public width = 20;
  public height = 20;

  private speed = 10;

  move() {
    this.posX += Math.cos(this.angle) * this.speed;
    this.posY += Math.sin(this.angle) * this.speed;
  }

  isOutsideScene(): boolean {
    const outsideX = this.posX + this.width < 0 || this.posX > document.body.clientWidth;
    const outsideY = this.posY + this.height < 0 || this.posY > document.body.clientHeight;

    return outsideX || outsideY;
  }
}
