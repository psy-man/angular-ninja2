import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
  host: {
    '[class]': 'size',
    '[style.transform]': `'translateX(' + posX + 'px)'`
  }
})
export class PizzaComponent implements OnInit {

  @Input() type!: string;
  @Input() size!: string;

  posX = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
