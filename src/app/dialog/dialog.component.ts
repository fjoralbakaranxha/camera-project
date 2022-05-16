import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  cameraForm!: FormGroup;
  dialogTitle: string = "Add Camera";
  buttonText: string = "Save";
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject (MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.cameraForm = this.formBuilder.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      resolution: ['', Validators.required],
      ip: ['', Validators.required],
    });

    if(this.editData) {
      this.dialogTitle= "Update Camera";
      this.buttonText="Update";
      this.cameraForm.controls['name'].setValue(this.editData.name);
      this.cameraForm.controls['model'].setValue(this.editData.model);
      this.cameraForm.controls['resolution'].setValue(this.editData.resolution);
      this.cameraForm.controls['ip'].setValue(this.editData.ip);
    }
  }

  onSubmit() {
    if (!this.cameraForm.valid) return;

    if(this.editData) {
      this.api.editCamera({id: this.editData.id,...this.cameraForm.value}).subscribe((data) => {
        this.dialogRef.close(data);
      })
    }
    else {
      this.api.createCamera(this.cameraForm.value).subscribe((data) => {
        this.dialogRef.close(data);
      })
    }
  }
}
