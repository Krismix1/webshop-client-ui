import { NgModule } from '@angular/core';
import { MatListModule, MatInputModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    MatListModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  exports: [
      MatListModule,
      MatInputModule,
      MatToolbarModule,
      MatIconModule,
      MatFormFieldModule,
      MatButtonModule
  ]
})
export class MaterialModule { }
