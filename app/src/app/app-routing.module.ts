// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { CallbackComponent } from './callback/callback.component';
import { PublicDealsComponent } from './public-deals/public-deals.component';
import { PrivateDealsComponent } from './private-deals/private-deals.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'deals',
		pathMatch: 'full'
	},
	{
		path: 'deals',
		component: PublicDealsComponent
	},
	{
		path: 'special',
		component: PrivateDealsComponent,
		//guarding the route, can only be logged in
		canActivate: [ AuthGuard ]
	},
	{
		path: 'callback',
		component: CallbackComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	providers: [ AuthGuard ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
