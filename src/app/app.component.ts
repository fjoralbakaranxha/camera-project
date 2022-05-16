
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Camera } from './models/Camera';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'camera';
  displayedColumns: string[] = ['name', 'model', 'resolution', 'ip', 'actions'];
  dataSource!: MatTableDataSource<Camera>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api : ApiService, private _snackBar: MatSnackBar) {
    this.api.getCameras().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.updateTb();
    });
  }

  ngOnInit(): void {}

  updateTb() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width:"30%"
    });

    dialogRef.afterClosed().subscribe((data) => {
      if(!data) return;
      this.dataSource = new MatTableDataSource([...this.dataSource.data, data]);
      this.updateTb();
      this._snackBar.open("Camera created successfully!", "Ok");
    })
  }

  editCamera(row: Camera) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width:"30%",
      data: row
    });
    
    dialogRef.afterClosed().subscribe((data) => {
      if(!data) return;
      this.api.getCameras().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.updateTb();
      });
      this._snackBar.open("Camera updated successfully!", "Ok");
    })
  }

  deleteCamera(row: Camera) {
    this.api.deleteCamera(row.id).subscribe(() => {
      const filteredData = this.dataSource.data.filter(item => item.id !== row.id);
      this.dataSource = new MatTableDataSource(filteredData);
      this.updateTb();
      this._snackBar.open("Camera deleted successfully!", "Ok");
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
