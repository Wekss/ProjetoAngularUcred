import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatButtonModule, MatIconButton } from "@angular/material/button";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { LocalStorageService } from "../../local-storage.service"; // ajusta o caminho do local storage.ts
import { MatCheckboxModule } from "@angular/material/checkbox";
import { DialogComponentComponent } from "../dialog-component/dialog-component.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { DialogConfirmComponent } from "../dialog-confirm/dialog-confirm.component";
import { DialogUndoComponent } from "../dialog-undo/dialog-undo.component";
import { ImageSliderComponent } from "../image-slider/image-slider.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule, CommonModule, MatIcon, MatButton, MatLabel, MatFormField, MatIconButton, MatSuffix, MatCheckboxModule, MatButtonModule, MatDialogModule, ImageSliderComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  items: { id: number, name: string, done: boolean }[] = [];
  id: number = 1;
  taskInput: string = "";
  slides: Array<{ image: string, caption: string }> = [];

  constructor(private localStorageService: LocalStorageService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadItemsFromLocalStorage(); // Carrega os itens do localStorage
    this.loadImagesFromLocalStorage(); // Carrega as imagens do localStorage
  }

  loadItemsFromLocalStorage() {
    const storedItems = this.localStorageService.getData('items');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.id = this.items.length > 0 ? Math.max(...this.items.map(item => item.id)) + 1 : 1;
    }
  }

  loadImagesFromLocalStorage() {
    const storedImages = localStorage.getItem('uploadedImages');
    if (storedImages) {
      try {
        const images = JSON.parse(storedImages) as string[];
        this.slides = images.map(image => ({ image, caption: 'Imagem carregada' }));
      } catch (error) {
        console.error('Erro ao carregar imagens do localStorage', error);
      }
    }
  }

  addItem() {
    this.items.push({
      id: this.id,
      name: this.taskInput,
      done: false
    });
    this.taskInput = "";
    this.id++;
    this.saveItemsToLocalStorage();
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveItemsToLocalStorage();
  }

  getItems(showDone: boolean) {
    return this.items.filter(item => item.done === showDone);
  }

  setDone(id: number) {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      const currentState = this.items[index].done;
      this.items[index].done = !currentState;
      this.saveItemsToLocalStorage();
    }
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(DialogComponentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteItem(id);
      }
    });
  }

  confirmDone(id: number): void {
    const item = this.items.find(item => item.id === id);
    if (item) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: { message: item.done ? 'Deseja marcar como não concluído?' : 'Deseja marcar como concluído?' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirmdone') {
          this.setDone(id);
        }
      });
    }
  }

  saveItemsToLocalStorage() {
    this.localStorageService.saveData('items', JSON.stringify(this.items));
  }

  undoConfirm(id: number) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      const dialogRef = this.dialog.open(DialogUndoComponent, {
        data: { message: item.done ? 'Deseja marcar como não concluído?' : 'Deseja marcar como concluído?' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirmundo') {
          this.setDone(id);
        }
      });
    }
  }

}
