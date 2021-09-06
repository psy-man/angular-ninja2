import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
  host: {
    '[class]': 'size'
  }
})
export class PizzaComponent implements OnInit {

  @Input() type!: string;
  @Input() size!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
