import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { HomeComponent } from './home.component'
import { ActivatedRoute } from '@angular/router'
import { HeroesService } from '../../_services/heroes.service'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let mockActivatedRoute: any

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '644'
        }
      }
    }

    const heroesServiceSpy: jasmine.SpyObj<HeroesService> = jasmine.createSpyObj('HeroesService', ['getHeroes'])

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroesService, useValue: heroesServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render title', () => {
    const compiled: HTMLElement = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('h1')?.textContent).toContain('HEROES LIST')
  })

  it('should load heroes on initialization', () => {
    component.ngOnInit()
    expect(component.heroes.length).toBeGreaterThan(0)
    expect(component.oldHeroes.length).toBeGreaterThan(0)
  })

  it('should filter heroes based on search input', () => {
    component.filterHeroes('superman')
    expect(component.heroes.length).toBe(1)
    expect(component.heroes[0].name).toBe('Superman')
  })
})
