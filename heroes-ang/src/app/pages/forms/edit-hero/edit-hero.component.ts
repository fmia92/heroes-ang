import { Component, Inject } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select'
import { MatDividerModule } from '@angular/material/divider'
import { ActivatedRoute, type ParamMap, Router, RouterModule } from '@angular/router'
import { type HeroAPI } from '../../../interfaces/hero'
import { HeroesService } from '../../../_services/heroes.service'
import { AlertService } from '../../../_services/alert.service'

@Component({
  selector: 'app-edit-hero',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatDividerModule, MatCardModule, RouterModule, MatSelectModule],
  templateUrl: './edit-hero.component.html',
  styleUrl: './edit-hero.component.css'
})
export class EditHeroComponent {
  heroId: string = ''
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
      lg: '',
      md: '',
      sm: '',
      xs: ''
    }
  }

  constructor (
    @Inject(ActivatedRoute) private readonly activateRoute: ActivatedRoute,
    @Inject(Router) private readonly router: Router,
    @Inject(HeroesService) private readonly heroesService: HeroesService,
    @Inject(AlertService) private readonly alertService: AlertService
  ) {
    this.activateRoute.paramMap.subscribe((params: ParamMap): void => {
      this.heroId = params.get('id') ?? ''
    })
  }

  ngOnInit (): void {
    console.log(this.heroId)
    this.getHero()
  }

  onSubmit (): void {
    console.log('Form:', this.selectedHero)

    if (this.selectedHero.slug === '') {
      this.selectedHero.slug = this.selectedHero.name.toLowerCase().split(' ').join('-')
    }

    if (!this.selectedHero.appearance.height[1].includes('cm')) {
      this.selectedHero.appearance.height[1] = this.selectedHero.appearance.height[1] + ' cm'
    }

    if (!this.selectedHero.appearance.weight[1].includes('kg')) {
      this.selectedHero.appearance.weight[1] = this.selectedHero.appearance.weight[1] + ' kg'
    }

    this.heroesService.updateHero(this.heroId, this.selectedHero).subscribe((_: any): void => { // Add type annotation to the _ parameter
      this.alertService.showSuccess('Hero Updated')
      void this.router.navigate(['/heroes'])
    },
    (error: any) => {
      console.log('Error:', error)
      this.alertService.showError('Error updating hero')
    })
  }

  getHero (): void {
    this.heroesService.getHeroById(this.heroId).subscribe((hero: HeroAPI) => {
      this.selectedHero = hero
      console.log('Selected Hero:', this.selectedHero)
    })
  }
}
