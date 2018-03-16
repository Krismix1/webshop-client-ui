import { NgModule } from '@angular/core';
import { MatListModule, MatInputModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MatListModule,
    MatInputModule,
    MatToolbarModule
  ],
  exports: [
      MatListModule,
      MatInputModule,
      MatToolbarModule
  ]
})
export class MaterialModule { }
