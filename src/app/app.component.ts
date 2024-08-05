import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {CommonModule} from "@angular/common";
import {TemplateBindingComponent} from "./components/template-binding/template-binding.component";
import {HeaderComponent} from "./components/header/header.component";
import {ListComponent} from "./components/list/list.component";
import { SharedModule } from './shared/shared.module';
import {LocalStorageService} from "./local-storage.service";
import {ImageSliderComponent} from "./components/image-slider/image-slider.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, TemplateBindingComponent, ListComponent, SharedModule, ImageSliderComponent],

  template: `


      <app-header></app-header>
      <app-template-binding></app-template-binding>
      <app-list></app-list>



  `,
})
export class AppComponent {
  constructor(private localStore:LocalStorageService) {
  }

}



