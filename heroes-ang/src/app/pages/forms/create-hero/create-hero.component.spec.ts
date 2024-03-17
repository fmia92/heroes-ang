import { type ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateHeroComponent } from './create-hero.component'
import { HttpClient, HttpHandler } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router'

describe('CreateHeroComponent', () => {
  let component: CreateHeroComponent
  let fixture: ComponentFixture<CreateHeroComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHeroComponent],
      providers: [HttpClient, HttpHandler, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => '1'
            }
          }
        }
      }]
    })
      .compileComponents()

    fixture = TestBed.createComponent(CreateHeroComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
