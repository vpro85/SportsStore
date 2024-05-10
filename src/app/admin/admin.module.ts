import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';
import { MaterialFeatures } from './material.module';

let routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing, MaterialFeatures],
  declarations: [AuthComponent],
  providers: [AuthGuard],
})
export class AdminModule {}
