import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

let routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  declarations: [AuthComponent],
})
export class AdminModule {}
