import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {Heroes} from '../mock-heroes';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes = Heroes;
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
     this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}
