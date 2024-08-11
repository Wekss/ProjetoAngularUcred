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
  handleFileInput(event: any) {
    const files = event.target.files;
    if (files.length === 0) {
      return; // Nenhum arquivo selecionado
    }

    const reader = new FileReader();
    const images: string[] = [];
    let filesRead = 0;

    // Função para ler um arquivo e armazenar a imagem
    const readFile = (file: File) => {
      reader.onloadend = () => {
        images.push(reader.result as string);
        filesRead++;
        if (filesRead === files.length) {
          // Armazena todas as imagens em Base64 no localStorage
          localStorage.setItem('uploadedImages', JSON.stringify(images));
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
