import { Component, Inject } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select'
import { MatDividerModule } from '@angular/material/divider'
import { Router, RouterModule } from '@angular/router'
import { type HeroAPI } from '../../../interfaces/hero'
import { HeroesService } from '../../../_services/heroes.service'
import { AlertService } from '../../../_services/alert.service'

@Component({
  selector: 'app-create-hero',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, MatDividerModule, MatCardModule, RouterModule, MatSelectModule],
  templateUrl: './create-hero.component.html',
  styleUrl: './create-hero.component.css'
})
export class CreateHeroComponent {
  selectedHero: HeroAPI = {
    id: '',
    name: '',
    slug: '',
    powerstats: {
      intelligence: 0,
      strength: 0,
      speed: 0,
      durability: 0,
      power: 0,
      combat: 0
    },
    appearance: {
      gender: '',
      race: '',
      height: [''],
      weight: [''],
      eyeColor: '',
      hairColor: ''
    },
    biography: {
      fullName: '',
      alterEgos: '',
      aliases: [''],
      placeOfBirth: '',
      firstAppearance: '',
      publisher: '',
      alignment: ''
    },
    work: {
      occupation: '',
      base: ''
    },
    connections: {
      groupAffiliation: '',
      relatives: ''
    },
    images: {
      lg: '/assets/img/random_superhero.jpg',
      md: '/assets/img/random_superhero.jpg',
      sm: '/assets/img/random_superhero.jpg',
      xs: '/assets/img/random_superhero.jpg'
    }
  }

  constructor (
    @Inject(Router) private readonly router: Router,
    @Inject(HeroesService) private readonly heroesService: HeroesService,
    @Inject(AlertService) private readonly alertService: AlertService
  ) { }

  generateRamdomUUID (): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c: string) {
      const r: number = Math.random() * 16 | 0
      const v: string = c === 'x' ? r.toString(16) : (r & 0x3 | 0x8).toString(16)
      return v
    })
  }

  onSubmit (): void {
    console.log('Form:', this.selectedHero)
    this.selectedHero.id = this.generateRamdomUUID()
    if (this.selectedHero.slug === '') {
      this.selectedHero.slug = this.selectedHero.name.toLowerCase().split(' ').join('-')
    }

    if (!this.selectedHero.appearance.height[1].includes('cm')) {
      this.selectedHero.appearance.height[1] = this.selectedHero.appearance.height[1] + ' cm'
    }

    if (!this.selectedHero.appearance.weight[1].includes('kg')) {
      this.selectedHero.appearance.weight[1] = this.selectedHero.appearance.weight[1] + ' kg'
    }

    this.heroesService.createHero(this.selectedHero).subscribe((value: HeroAPI): void => {
      this.alertService.showSuccess('Hero created successfully')
      void this.router.navigate(['/'])
    },
    (error: any) => {
      console.error('Error:', error)
      this.alertService.showError('Error creating hero')
    })
  }
}
