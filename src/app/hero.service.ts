import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private heroesUrl = 'api/heroes'; // call to the web api
  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

    private log(message: string) {
      this.messageService.add('HeroService: ${message}');
    }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message after fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(Heroes);
  }

  getHero(id: number): Observable<Hero> {
    // send the message after fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(Heroes.find(hero => hero.id === id));
  }
}
