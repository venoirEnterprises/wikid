import { Hero } from '../hero';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero.service';

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
	@Input() selectedHero: Hero;
	constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) {}

	ngOnInit(): void {
		this.getHero();
	}

	getHero(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.heroService.getHero(id).subscribe((hero) => (this.selectedHero = hero));
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		this.heroService.updateHero(this.selectedHero).subscribe(() => this.goBack());
	}

	delete(): void {
		this.heroService.deleteHero(this.selectedHero).subscribe(() => this.goBack());
	}
}
