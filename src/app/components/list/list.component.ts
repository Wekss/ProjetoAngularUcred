import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule, CommonModule, MatIcon, MatButton, MatLabel, MatFormField
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  items: { id: number, name: string, done: boolean }[] = [];
  id: number = 1;
  taskInput: string = "";

  addItem = () => {
    this.items.push({
      id: this.id,
      name: this.taskInput,
      done: false
    })
    this.taskInput = ""
    this.id++
  }
  getItems(done:boolean){
    return this.items.filter(item=> item.done === done);
  }

  setDone = (id:number) => {
    const index = this.items.findIndex(item => item.id ===id);

    if(index !==-1){
      const currentState = this.items[index].done;
      this.items[index].done = !currentState;
    }
  }
  protected readonly MatIcon = MatIcon;
}
