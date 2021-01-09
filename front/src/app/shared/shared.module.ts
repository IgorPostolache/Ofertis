import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MillisToDatePipe } from './misc/pipes/millis-to-date.pipe';




@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    MillisToDatePipe,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule
  ],

  exports: [
    LoadingSpinnerComponent,
    MillisToDatePipe,
    NavBarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class SharedModule { }
