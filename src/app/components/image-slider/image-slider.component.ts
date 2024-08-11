import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [
    NgStyle,
    NgForOf
  ],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent implements OnInit {
  @Input() slides: Array<{ image: string, caption: string }> = [];
  currentSlide: number = 0;

  ngOnInit() {
    // Não é necessário carregar imagem aqui, pois já é feito no list.component
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
