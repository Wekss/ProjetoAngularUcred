import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {LocalStorageService} from "../../local-storage.service"; // ajusta o caminho do local storage.ts
import {MatCheckboxModule} from "@angular/material/checkbox";


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule, CommonModule, MatIcon, MatButton, MatLabel, MatFormField, MatIconButton, MatSuffix, MatCheckboxModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  items: { id: number, name: string, done: boolean }[] = [];
  id: number = 1;
  taskInput: string = "";

  constructor(private localStorageService: LocalStorageService) { }

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
  getItems(done: boolean) { //recupera item
    return this.items.filter(item => item.done === done);
  }

  setDone = (id: number) => { //seta se esta feito
    const index = this.items.findIndex(item => item.id === id);

    if (index !== -1) {
      const currentState = this.items[index].done;
      this.items[index].done = !currentState;
      this.saveItemsToLocalStorage();
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
}
