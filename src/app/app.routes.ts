import { Routes } from '@angular/router';
import { FormUserComponent } from './form-user/form-user.component';
import { InfoUserComponent } from './info-user/info-user.component';

export const routes: Routes = [
  { path: 'home', component: FormUserComponent },
  { path: 'info-user', component: InfoUserComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
