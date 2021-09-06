import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild } from "@angular/core";
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

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  createPizza() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(PizzaComponent);
    const componentRef = this.containerRef.createComponent(factory);

    componentRef.instance.type = this.type;
    componentRef.instance.size = this.big ? 'big' : 'small';
  }
}
