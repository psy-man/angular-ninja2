import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef } from "@angular/core";
import { PizzaComponent } from "./pizza/pizza.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  public containerRef!: ViewContainerRef

  public big: boolean = false;
  public type: string = 'Pepperoni';

  pizzas: ComponentRef<PizzaComponent>[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.go();
  }

  go() {
    requestAnimationFrame(this.go.bind(this));

    for (const pizza of this.pizzas) {
      pizza.instance.posX += 0.4;

      if (pizza.instance.posX >= 600) {
        pizza.destroy();
      }
    }
  }

  createPizza() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(PizzaComponent);
    const componentRef = this.containerRef.createComponent(factory);

    componentRef.instance.type = this.type;
    componentRef.instance.size = this.big ? 'big' : 'small';

    this.pizzas.push(componentRef);
  }
}
