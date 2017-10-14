import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Jsonp, JsonpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { AppComponent } from './app.component';
import { EditService } from './core';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        JsonpModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ButtonsModule,
        GridModule,
        PDFModule,
        ExcelModule
    ],
    providers: [EditService],
    bootstrap: [AppComponent]
})
export class AppModule {}