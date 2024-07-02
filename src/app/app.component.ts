import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {CommonModule} from "@angular/common";
import {TemplateBindingComponent} from "./components/template-binding/template-binding.component";
import {HeaderComponent} from "./components/header/header.component";
import {ListComponent} from "./components/list/list.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent,TemplateBindingComponent,ListComponent],

  template: `

    <div class="theme-dark">
      <app-header></app-header>
      <app-template-binding></app-template-binding>
      <app-list></app-list>

    </div>
  `,
})
export class AppComponent {}
