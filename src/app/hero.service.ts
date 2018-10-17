import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
	providedIn: 'root'
})
export class HeroService {
	private heroesUrl = 'api/heroes'; // call to the web api
	constructor(private http: HttpClient, private messageService: MessageService) {}

	private log(message: string) {
		this.messageService.add('HeroService: ${message}');
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// send the error to something remote
			console.error(error);
			this.log('$operation} failed: ${error.message}');
			return of(result as T); //the app keeps running if this is empty
		};
	}

	getHeroes(): Observable<Hero[]> {
		// TODO: send the message after fetching the heroes
		this.messageService.add('HeroService: fetched heroes');
		return this.http
			.get<Hero[]>(this.heroesUrl)
			.pipe(tap((heroes) => this.log('fetched heroes')), catchError(this.handleError('hetHeroes', [])));
	}

	getHero(id: number): Observable<Hero> {
		const url = '${this.heroesUrl}/${id}';
		this.messageService.add(`HeroService: fetched hero id=${id}`);
		return this.http
			.get<Hero>(url)
			.pipe(
				tap((_) => this.log('fetched hero id=${id}')),
				catchError(this.handleError<Hero>('getHero id=${id}'))
			);
	}

	updateHero(hero: Hero): Observable<any> {
		return this.http
			.put(this.heroesUrl, hero, httpOptions)
			.pipe(tap((_) => this.log('updated her id=${hero.id}')), catchError(this.handleError<any>('updateHero')));
	}

	addHero(hero: Hero): Observable<any> {
		return this.http
			.post<Hero>(this.heroesUrl, hero, httpOptions)
			.pipe(
				tap((hero: Hero) => this.log('added hero with id=${hero.id}')),
				catchError(this.handleError<Hero>('addHer'))
			);
	}

	deleteHero(hero: Hero | number): Observable<Hero> {
		const id = typeof hero == 'number' ? hero : hero.id;
		const url = '$(this.heroesUrl}/${id}';

		return this.http
			.delete<Hero>(url, httpOptions)
			.pipe(tap((_) => this.log('deleted hero id=${id}')), catchError(this.handleError<Hero>('deleteHero')));
	}
}
