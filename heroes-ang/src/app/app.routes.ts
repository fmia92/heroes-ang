import type { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { HeroDetailsComponent } from './pages/hero-details/hero-details.component'
import { EditHeroComponent } from './pages/forms/edit-hero/edit-hero.component'
import { CreateHeroComponent } from './pages/forms/create-hero/create-hero.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'hero/:id',
    component: HeroDetailsComponent
  },
  {
    path: 'hero/edit/:id',
    component: EditHeroComponent
  },
  {
    path: 'create',
    component: CreateHeroComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]
