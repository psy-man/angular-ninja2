import {
  Component,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  ComponentRef,
  HostListener, ElementRef, Type, AfterViewInit, ChangeDetectionStrategy
} from '@angular/core';
import { ShurikenComponent } from "./shuriken/shuriken.component";
import { FruitComponent } from './fruits/fruit.component';
import { AppleComponent } from './fruits/apple/apple.component';
import { CherryComponent } from './fruits/cherry/cherry.component';
import { BananaComponent } from './fruits/banana/banana.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild('scene', { read: ViewContainerRef})
  public scene!: ViewContainerRef

  @ViewChild('ninja', { static: true })
  public ninja!: ElementRef;

  @HostListener('document:keydown.space')
  public shoot() {
    this.spawnShuriken();
  }

  @HostListener('document:mousemove', ['$event'])
  public mousePosition(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  public mouseX!: number;
  public mouseY!: number;

  fruitsCollection = [ AppleComponent, CherryComponent, BananaComponent ];
  fruits: ComponentRef<FruitComponent>[] = [];

  shurikens: ComponentRef<ShurikenComponent>[] = [];

  private intervalId!: number;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private authService: AuthService
  ) {
    this.renderScene();
  }

  renderScene() {
    requestAnimationFrame(this.renderScene.bind(this));

    for (const fruit of this.fruits) {
      fruit.instance.posY += 1.8;
      fruit.changeDetectorRef.markForCheck();

      if (fruit.instance.posY + fruit.instance.height >= document.body.clientHeight) {
        clearInterval(this.intervalId);

        this.fruits.forEach(f => f.destroy());
        this.fruits = [];

        this.shurikens.forEach(s => s.destroy());
        this.shurikens = [];

        console.log('Game Over!');
      }
    }

    for (const shuriken of this.shurikens) {
      shuriken.instance.move();
      shuriken.changeDetectorRef.markForCheck();

      if (shuriken.instance.isOutsideScene()) {
        shuriken.destroy();
        this.shurikens = this.shurikens.filter(s => s !== shuriken);
      }

      for (const fruit of this.fruits) {
        if (this.hitTest(shuriken, fruit)) {
          fruit.destroy();
          this.fruits = this.fruits.filter(f => f !== fruit);

          shuriken.destroy();
          this.shurikens = this.shurikens.filter(s => s !== shuriken);
        }
      }
    }
  }

  startGame(): void {
    this.intervalId = setInterval(() => this.spawnFruit(),700 );
  }

  // Minkowski addition
  hitTest(object1: ComponentRef<ShurikenComponent>, object2: ComponentRef<FruitComponent>) {
    const w = 0.4 * (object1.instance.width + object2.instance.width);
    const h = 0.4 * (object1.instance.height + object2.instance.height);

    const dx = object1.instance.centerX - object2.instance.centerX;
    const dy = object1.instance.centerY - object2.instance.centerY;

    return Math.abs(dx) <= w && Math.abs(dy) <= h;
  }

  getTargetAngle([ sourceX, sourceY ]: [ number, number ], [ targetX, targetY ]: [ number, number ]) {
    const distanceX = sourceX - targetX;
    const distanceY = sourceY - targetY;

    return Math.atan2(distanceY, distanceX) + Math.PI;
  }


  spawnFruit() {
    const fruitType = this.fruitsCollection[
      this.randomInt(0, this.fruitsCollection.length - 1)
    ];

    const componentRef = this.createComponent(fruitType);
    componentRef.instance.posX = this.randomInt(0, document.body.clientWidth - componentRef.instance.width);

    this.fruits.push(componentRef);
  }

  spawnShuriken() {
    const componentRef = this.createComponent(ShurikenComponent);

    const ninja = this.ninja.nativeElement.getBoundingClientRect();

    componentRef.instance.posX = ninja.x + (ninja.width / 2) - 10;
    componentRef.instance.posY = ninja.y + 40;

    componentRef.instance.angle = this.getTargetAngle(
      [ componentRef.instance.posX, componentRef.instance.posY ],
      [ this.mouseX, this.mouseY ]
    );
    this.shurikens.push(componentRef);
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private createComponent<T>(component: Type<T>): ComponentRef<T> {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    return this.scene.createComponent(factory);
  }

  auth() {
    this.authService.toggleAuth();
  }
}
