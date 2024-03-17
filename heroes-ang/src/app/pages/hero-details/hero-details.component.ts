import { Component, Inject, type OnInit } from '@angular/core'
import { ActivatedRoute, type ParamMap, RouterModule } from '@angular/router'
import { MatButtonModule, MatIconButton } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatBadgeModule } from '@angular/material/badge'
import { MatFormFieldModule } from '@angular/material/form-field'
import { type HeroAPI } from '../../interfaces/hero'
import { HeroesService } from '../../_services/heroes.service'

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatIconButton, MatFormFieldModule, MatBadgeModule, RouterModule],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent implements OnInit {
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
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    @Inject(HeroesService) private readonly heroesService: HeroesService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.heroId = params.get('id') ?? ''
    })
  }

  ngOnInit (): void {
    this.getHero()
  }

  getHero (): void {
    this.heroesService.getHeroById(this.heroId).subscribe((hero: HeroAPI): void => {
      this.selectedHero = hero
    })
  }
}
