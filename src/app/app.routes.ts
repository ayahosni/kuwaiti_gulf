import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';
import { DepartmentsComponent } from '../components/departments/departments.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('../components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('../components/about/about.component').then(m => m.AboutComponent)
  },

  {
    path: 'contact',
    loadComponent: () => import('../components/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('../components/departments/departments.component').then(m => m.DepartmentsComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('../components/products/products.component').then(m => m.ProductsComponent)
  },
  { path: '**', redirectTo: 'home' }
];