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
import {DialogConfirmComponent} from "../dialog-confirm/dialog-confirm.component";
import {DialogUndoComponent} from "../dialog-undo/dialog-undo.component";
import {ImageSliderComponent} from "../image-slider/image-slider.component";

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
export class ListComponent implements OnInit { //variaveis
  items: { id: number, name: string, done: boolean }[] = [];
  id: number = 1;
  taskInput: string = "";


  constructor(private localStorageService: LocalStorageService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadItemsFromLocalStorage();
  }

  addItem = () => { //adiciona item
    this.items.push({
      id: this.id,
      name: this.taskInput,
      done: false
    });
    this.taskInput = "";
    this.id++;
    this.saveItemsToLocalStorage(); //salva itens na memoria do navegador
  }

  deleteItem(id:number) { //deleta o item pelo id
    this.items = this.items.filter(item => item.id !== id);
    this.saveItemsToLocalStorage();
  }

  getItems(showDone: boolean) {
    return this.items.filter(item => item.done === showDone); // Filtra os itens com base no estado de conclusão
  }

  setDone = (id: number) => {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      const currentState = this.items[index].done;
      this.items[index].done = !currentState;
      this.saveItemsToLocalStorage();
    }
  }


  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(DialogComponentComponent); // component de confirmação de exclusão
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

  saveItemsToLocalStorage() { //salva no localstorage, memoria do navegador
    this.localStorageService.saveData('items', JSON.stringify(this.items));
  }


  loadItemsFromLocalStorage() { //carrega items do local storage
    const storedItems = this.localStorageService.getData('items');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.id = this.items.length > 0 ? Math.max(...this.items.map(item => item.id)) + 1 : 1;
    }
  }

  protected readonly MatIcon = MatIcon;
  slides = [
    { url: 'https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_1280.png', caption: 'First Slide' },
    { url: 'https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_1280.png', caption: 'Second Slide' },
    { url: 'https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_1280.png', caption: 'Third Slide' }
  ];

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

