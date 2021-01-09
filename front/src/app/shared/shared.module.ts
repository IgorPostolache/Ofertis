import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    LoadingSpinnerComponent,
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
    NavBarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class SharedModule { }
