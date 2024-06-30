import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NewComponent} from "./components/new-component/new-component.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NewComponent],
  template: `
    <h1>ProjetoAngularUcred</h1>
    <app-new-component></app-new-component>
  `
})
export class AppComponent {}
