import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';

const routes: Routes = [
  { path: 'create-profile', component: CreateProfileComponent },
  { path: 'view-profile/:studentId', component: ViewProfileComponent },
  { path: '', redirectTo: 'create-profile' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
