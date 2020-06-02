import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { GridModule, GroupService, PageService, EditService, CommandColumnService, RowDDService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { StudentCreateComponent } from './student-create/student-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [
    AppComponent,
    StudentCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    NgbModule,
    FormsModule,
    DropDownListModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [GroupService, PageService, EditService, CommandColumnService, RowDDService, SelectionService],
  bootstrap: [AppComponent],
  entryComponents: [StudentCreateComponent]
})
export class AppModule { }
