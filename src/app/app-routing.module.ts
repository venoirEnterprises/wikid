import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
const routes: Routes = [
	{
		path: '',
		redirectTo: '/heroes',
		pathMatch: 'full'
	},
	{
		path: 'heroes',
		component: HeroesComponent
	},
	{
		path: 'detail/:id',
		component: HeroDetailComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [ AuthGuard ]
	}
];
@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
