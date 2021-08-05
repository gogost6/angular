import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './core/about/about.component';
import { DetailsComponent } from './functional/details/details.component';
import { FormComponent } from './functional/form/form.component';
import { PostCarComponent } from './functional/post-car/post-car.component';
import { SearchComponent } from './functional/search/search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: FormComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'post-car',
    component: PostCarComponent
  },
  {
    path: 'search-car',
    component: SearchComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'auth/logout',
    pathMatch: 'full',
    redirectTo: '/home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
