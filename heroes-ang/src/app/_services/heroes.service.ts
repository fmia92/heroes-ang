import { Inject, Injectable } from '@angular/core'
import { type HeroAPI } from '../interfaces/hero'
import { map, type Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  constructor (
    @Inject(HttpClient) private readonly http: HttpClient
  ) { }

  private readonly URL_HEROES: string = 'http://localhost:3000/heroes'

  public getHeroes (): Observable<HeroAPI[]> {
    return this.http.get<HeroAPI[]>(this.URL_HEROES)
  }

  getHeroById (id: string): Observable<any> {
    return this.http.get<any>(`${this.URL_HEROES}/${id}`).pipe(
      map((hero: HeroAPI[]) => {
        return hero
      })
    )
  }

  public updateHero (id: string, hero: HeroAPI): Observable<HeroAPI> {
    return this.http.put<HeroAPI>(`${this.URL_HEROES}/${id}`, hero)
  }

  public createHero (hero: HeroAPI): Observable<HeroAPI> {
    return this.http.post<HeroAPI>(this.URL_HEROES, hero)
  }

  public deleteHero (id: string): Observable<HeroAPI> {
    return this.http.delete<HeroAPI>(`${this.URL_HEROES}/${id}`)
  }
}
