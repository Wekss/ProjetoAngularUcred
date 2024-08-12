import { Component } from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatButton,
    MatMenuItem,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private imageSlider: any;

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files.length === 0) {
      return; // Nenhum arquivo selecionado
    }

    const reader = new FileReader();
    const images: string[] = [];

    // Carrega imagens já armazenadas no localStorage
    const storedImages = localStorage.getItem('uploadedImages');
    const existingImages = storedImages ? JSON.parse(storedImages) as string[] : [];

    let filesRead = 0;

    // Função para ler um arquivo e armazenar a imagem
    const readFile = (file: File) => {
      reader.onloadend = () => {
        images.push(reader.result as string);
        filesRead++;
        if (filesRead === files.length) {
          // Adiciona novas imagens ao array existente
          const updatedImages = existingImages.concat(images);

          // Armazena todas as imagens no localStorage
          localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));

          // Adiciona as imagens ao array de slides no ImageSliderComponent
          images.forEach(image => this.imageSlider.addImageToSlides(image));
        }
      };
      reader.readAsDataURL(file);
    };

    // Itera sobre os arquivos selecionados e os lê
    for (let i = 0; i < files.length; i++) {
      readFile(files[i]);
    }
  }
}
