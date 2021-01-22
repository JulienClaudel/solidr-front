import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-elements',
  templateUrl: './dialog-elements.component.html',
  styleUrls: ['./dialog-elements.component.scss']
})
export class DialogElementsComponent implements OnInit {
  executeAction = true;

  constructor(
    public dialogRef: MatDialogRef<DialogElementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onNoClick(): void {
    this.executeAction = false;
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}


