import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-dialog-undo',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-undo.component.html',
  styleUrl: './dialog-undo.component.scss'
})
export class DialogUndoComponent {
  showConfirmation:boolean = true;
  constructor(
    public dialogRef: MatDialogRef<DialogUndoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  undoConfirm(): void {
    this.dialogRef.close('confirmundo');
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
