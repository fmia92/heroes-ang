import { Component, Inject, type OnInit } from '@angular/core'
import { MatButtonModule, MatIconButton } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { HeroesService } from '../../_services/heroes.service'
import { type HeroAPI, type Hero } from '../../interfaces/hero'
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs'
import { FormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AlertService } from '../../_services/alert.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatIconButton, MatFormFieldModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  heroes: Hero[] = []
  oldHeroes: Hero[] = []
  search: string = ''
  valueFilter: string = ''
  searchInput: Subject<string> = new Subject<string>()

  constructor (
    @Inject(HeroesService) private readonly heroesService: HeroesService,
    @Inject(Router) private readonly router: Router,
    @Inject(AlertService) private readonly alertService: AlertService
  ) {
    this.searchInput.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value: string): void => {
      this.filterHeroes(value)
    })
  }

  ngOnInit (): void {
    this.loadHeroes()
  }

  loadHeroes (): void {
    this.heroesService.getHeroes().subscribe((heroes: HeroAPI[]): void => {
      this.heroes = heroes.map((hero: HeroAPI) => {
        const { id, name, images: { md: imageHero, xs: avatarHero } }: { id: string, name: string, images: { md: string, xs: string } } = hero
        const { race, height, weight }: { race: string, height: string[], weight: string[] } = hero.appearance
        const { fullName }: { fullName: string } = hero.biography
        const { intelligence, strength, speed, durability, power, combat }: { intelligence: number, strength: number, speed: number, durability: number, power: number, combat: number } = hero.powerstats
        return {
          id,
          name,
          avatar: avatarHero,
          image: imageHero,
          fullName,
          race,
          height: height[1],
          weight: weight[1],
          stats: {
            intelligence,
            strength,
            speed,
            durability,
            power,
            combat
          }
        }
      })
      this.oldHeroes = this.heroes
      console.log('Heroes:', this.heroes)
    })
  }

  showHeroData (id: string): void {
    void this.router.navigate(['/hero/', id])
  }

  onSearch (event: Event): void {
    const value: string = (event.target as HTMLInputElement).value
    this.searchInput.next(value)
  }

  filterHeroes (searchValue: string): void {
    if (searchValue.length === 0) {
      this.heroes = this.oldHeroes
      return
    }

    this.heroes = [...this.oldHeroes].filter((hero: Hero) => {
      return hero.name.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  deleteHero (id: string): void {
    console.log('Delete Hero:', id)
    if (confirm('Are you sure you want to delete this hero?')) {
      this.heroesService.deleteHero(id).subscribe(() => {
        this.loadHeroes()
        this.alertService.showSuccess('Hero deleted successfully')
      })
    }
  }
}
