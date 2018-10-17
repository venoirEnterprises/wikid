import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

	getHeroes(): Observable<Hero[]> {
		// TODO: send the message after fetching the heroes
		return this.http
			.get<Hero[]>(this.heroesUrl)
			.pipe(tap((heroes) => this.log('fetched heroes')), catchError(this.handleError('getHeroes', [])));
	}

	getHeroNo404<Data>(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/?id=${id}`;
		return this.http.get<Hero[]>(url).pipe(
			map((heroes) => heroes[0]), //(0|1) Array
			tap((h) => {
				const outcome = h ? 'fetched' : 'did not find';
				this.log(`${outcome} hero id=${id}`);
			}),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}

	getHero(id: number): Observable<Hero> {
		const url = this.heroesUrl + '/' + id;
		return this.http
			.get<Hero>(url)
			.pipe(
				tap((_) => this.log(`fetched hero id=${id}`)),
				catchError(this.handleError<Hero>(`getHero id=${id}`))
			);
	}

	searchHeroes(term: string): Observable<Hero[]> {
		if (!term.trim()) {
			//it's not a search term, so an empty array is returned
			return of([]);
		}
		return this.http
			.get<Hero[]>(this.heroesUrl + '/?name=' + term)
			.pipe(
				tap((_) => this.log(`found heroes matching ${term}`)),
				catchError(this.handleError<Hero[]>('searchHeroes', []))
			);
	}

	addHero(hero: Hero): Observable<any> {
		return this.http
			.post<Hero>(this.heroesUrl, hero, httpOptions)
			.pipe(
				tap((hero: Hero) => this.log(`added hero with id=${hero.id}`)),
				catchError(this.handleError<Hero>('addHer'))
			);
	}
	updateHero(hero: Hero): Observable<any> {
		return this.http
			.put(this.heroesUrl, hero, httpOptions)
			.pipe(tap((_) => this.log(`updated her id=${hero.id}`)), catchError(this.handleError<any>('updateHero')));
	}

	deleteHero(hero: Hero | number): Observable<Hero> {
		const id = typeof hero == 'number' ? hero : hero.id;
		const url = this.heroesUrl + '/' + id;

		return this.http
			.delete<Hero>(url, httpOptions)
			.pipe(tap((_) => this.log(`deleted hero id=${id}`)), catchError(this.handleError<Hero>('deleteHero')));
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// send the error to something remote
			console.error(error);
			this.log(`$operation} failed: ${error.message}`);
			return of(result as T); //the app keeps running if this is empty
		};
	}

	private log(message: string) {
		this.messageService.add(`HeroService: ${message}`);
	}
}
