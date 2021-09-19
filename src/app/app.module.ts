import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShurikenComponent } from './shuriken/shuriken.component';
import { FormsModule } from "@angular/forms";
import { AppleComponent } from './fruits/apple/apple.component';
import { CherryComponent } from './fruits/cherry/cherry.component';
import { BananaComponent } from './fruits/banana/banana.component';
import { AuthDirective } from './auth/auth.directive';
import { FruitComponent } from './fruits/fruit.component';

@NgModule({
  declarations: [
    AppComponent,
    ShurikenComponent,
    AppleComponent,
    CherryComponent,
    BananaComponent,
    AuthDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
