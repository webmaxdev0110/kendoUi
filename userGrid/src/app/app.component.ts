import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Product } from './core';
import { EditService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public view: Observable<GridDataResult>;
  public gridState: State = {
      sort: [],
      skip: 0,
      take: 10
  };
  public formGroup: FormGroup;

  private editedRowIndex: number;

  constructor(private editService: EditService) {
  }

  public ngOnInit(): void {
      this.view = this.editService.map(data => process(data, this.gridState));
      this.editService.read();
  }

  public onStateChange(state: State) {
      this.gridState = state;

      this.editService.read();
  }

  protected addHandler({sender}) {
      this.closeEditor(sender);

      this.formGroup = new FormGroup({
          'ProductID': new FormControl(),
          'ProductName': new FormControl("", Validators.required),
          'UnitPrice': new FormControl(0),
          'UnitsInStock': new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
          'Discontinued': new FormControl(false)
      });

      sender.addRow(this.formGroup);
  }

  protected editHandler({sender, rowIndex, dataItem}) {
      this.closeEditor(sender);

      this.formGroup = new FormGroup({
          'ProductID': new FormControl(dataItem.ProductID),
          'ProductName': new FormControl(dataItem.ProductName, Validators.required),
          'UnitPrice': new FormControl(dataItem.UnitPrice),
          'UnitsInStock': new FormControl(dataItem.UnitsInStock, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
          'Discontinued': new FormControl(dataItem.Discontinued)
      });

      this.editedRowIndex = rowIndex;

      sender.editRow(rowIndex, this.formGroup);
  }

  protected cancelHandler({sender, rowIndex}) {
      this.closeEditor(sender, rowIndex);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
      grid.closeRow(rowIndex);
      this.editedRowIndex = undefined;
      this.formGroup = undefined;
  }

  protected saveHandler({sender, rowIndex, formGroup, isNew}) {
      const product: Product = formGroup.value;

      this.editService.save(product, isNew);

      sender.closeRow(rowIndex);
  }

  protected removeHandler({dataItem}) {
      this.editService.remove(dataItem);
  }
}
