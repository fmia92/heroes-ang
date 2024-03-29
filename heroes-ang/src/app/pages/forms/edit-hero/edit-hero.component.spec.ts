import { type ComponentFixture, TestBed } from '@angular/core/testing'

import { EditHeroComponent } from './edit-hero.component'
import { HttpClient, HttpHandler } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { HeroesService } from '../../../_services/heroes.service'

describe('EditHeroComponent', () => {
  let component: EditHeroComponent
  let fixture: ComponentFixture<EditHeroComponent>
  let mockActivatedRoute: any
  let mockHeroesService: any

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '332'
        }
      }
    }

    mockHeroesService = {
      getHeroById: () => of({
        id: '332',
        name: 'Hulk',
        slug: '332-hulk',
        powerstats: {
          intelligence: 88,
          strength: 100,
          speed: 63,
          durability: 100,
          power: 98,
          combat: 85
        },
        appearance: {
          gender: 'Male',
          race: 'Human / Radiation',
          height: [
            "8'0",
            '244 cm'
          ],
          weight: [
            '1400 lb',
            '630 kg'
          ],
          eyeColor: 'Green',
          hairColor: 'Green'
        },
        biography: {
          fullName: 'Bruce Banner',
          alterEgos: 'No alter egos found.',
          aliases: [
            'Annihilator',
            'Captain Universe',
            'Joe Fixit',
            'Mr. Fixit',
            'Mechano',
            'Professor',
            'Jade Jaws',
            'Golly Green Giant'
          ],
          placeOfBirth: 'Dayton, Ohio',
          firstAppearance: 'Incredible Hulk #1 (May, 1962)',
          publisher: 'Marvel Comics',
          alignment: 'good'
        },
        work: {
          occupation: 'Nuclear physicist, Agent of S.H.I.E.L.D.',
          base: '(Banner) Hulkbuster Base, New Mexico, (Hulk) mobile, but prefers New Mexico'
        },
        connections: {
          groupAffiliation: 'Defenders, former leader of the new Hulkbusters, member of the Avengers, Pantheon, Titans Three, the Order, Hulkbusters of Counter-Earth-Franklin, alternate Fantastic Four',
          relatives: "Betty Ross Talbot Banner (wife), Brian Banner (father, apparently deceased), Rebecca Banner (mother, deceased), Morris Walters (uncle), Elaine Banner Walters (aunt, deceased), Jennifer Walters (She-Hulk, cousin), Thaddeus E. 'Thunderbolt' Ross (father"
        },
        images: {
          xs: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/332-hulk.jpg',
          sm: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/332-hulk.jpg',
          md: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/332-hulk.jpg',
          lg: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg'
        }
      })
    }

    await TestBed.configureTestingModule({
      imports: [EditHeroComponent],
      providers: [HttpClient, HttpHandler,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroesService, useValue: mockHeroesService }
      ]
    })
      .compileComponents()

    fixture = TestBed.createComponent(EditHeroComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
