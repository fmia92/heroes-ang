import { type ComponentFixture, TestBed } from '@angular/core/testing'

import { HeroDetailsComponent } from './hero-details.component'
import { HttpClient, HttpHandler } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router'
import { HeroesService } from '../../_services/heroes.service'
import { of } from 'rxjs'

describe('HeroDetailsComponent', () => {
  let component: HeroDetailsComponent
  let fixture: ComponentFixture<HeroDetailsComponent>
  let mockActivatedRoute: any
  let mockHeroesService: any

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '644'
        }
      }
    }

    mockHeroesService = {
      getHeroById: () => of({
        id: '644',
        name: 'Superman',
        slug: '644-superman',
        powerstats: {
          intelligence: 94,
          strength: 100,
          speed: 100,
          durability: 100,
          power: 100,
          combat: 85
        },
        appearance: {
          gender: 'Male',
          race: 'Kryptonian',
          height: ["6'3",
            '191 cm'],
          weight: ['225 lb', '101 kg'],
          eyeColor: 'Blue',
          hairColor: 'Black'
        },
        biography: {
          fullName: 'Clark Kent',
          alterEgos: 'Superman Prime One-Million',
          aliases: [
            'Clark Joseph Kent',
            'The Man of Steel',
            'the Man of Tomorrow',
            'the Last Son of Krypton',
            'Big Blue',
            'the Metropolis Marvel',
            'the Action Ace'
          ],
          placeOfBirth: 'Krypton',
          firstAppearance: 'Action Comics #1',
          publisher: 'DC Comics',
          alignment: 'good'
        },
        work: {
          occupation: 'Reporter for the Daily Planet and novelist',
          base: 'Metropolis'
        },
        connections: {
          groupAffiliation: 'Justice League of America, The Legion of Super-Heroes (pre-Crisis as Superboy); Justice Society of America (pre-Crisis Earth-2 version); All-Star Squadron (pre-Crisis Earth-2 version)',
          relatives: 'Lois Lane (wife), Jor-El (father, deceased), Lara (mother, deceased), Jonathan Kent (adoptive father), Martha Kent (adoptive mother), Seyg-El (paternal grandfather, deceased), Zor-El (uncle, deceased), Alura (aunt, deceased), Supergirl (Kara Zor-El, cousin), Superboy (Kon-El/Conner Kent, partial clone)'
        },
        images: {
          lg: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg',
          md: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/644-superman.jpg',
          sm: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/644-superman.jpg',
          xs: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/644-superman.jpg'
        }
      })
    }

    await TestBed.configureTestingModule({
      imports: [HeroDetailsComponent],
      providers: [HttpClient, HttpHandler,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroesService, useValue: mockHeroesService }
      ]
    })
      .compileComponents()

    fixture = TestBed.createComponent(HeroDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set heroId correctly', () => {
    expect(component.heroId).toBe('644')
  })

  it('should set selectedHero correctly', () => {
    component.getHero()
    expect(component.selectedHero).toEqual({
      id: '644',
      name: 'Superman',
      slug: 'superman',
      powerstats: {
        intelligence: 100,
        strength: 100,
        speed: 100,
        durability: 100,
        power: 100,
        combat: 100
      },
      appearance: {
        gender: 'Male',
        race: 'Kryptonian',
        height: ['6\'3"', '190 cm'],
        weight: ['225 lb', '101 kg'],
        eyeColor: 'Blue',
        hairColor: 'Black'
      },
      biography: {
        fullName: 'Clark Kent',
        alterEgos: 'Kal-El',
        aliases: ['Man of Steel', 'The Last Son of Krypton'],
        placeOfBirth: 'Krypton',
        firstAppearance: 'Action Comics #1',
        publisher: 'DC Comics',
        alignment: 'Good'
      },
      work: {
        occupation: 'Journalist',
        base: 'Metropolis'
      },
      connections: {
        groupAffiliation: 'Justice League',
        relatives: 'Lois Lane (wife)'
      },
      images: {
        lg: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg',
        md: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/644-superman.jpg',
        sm: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/644-superman.jpg',
        xs: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/644-superman.jpg'
      }
    })
  })
})
