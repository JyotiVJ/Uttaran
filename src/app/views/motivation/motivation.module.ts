import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotivationRoutingModule } from './motivation-routing.module';
import { MotivationShowComponent } from './motivation-show/motivation-show.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MotivationShowComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MotivationRoutingModule
  ]
})
export class MotivationModule { }
