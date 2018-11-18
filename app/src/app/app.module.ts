import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicDealsComponent } from './public-deals/public-deals.component';
import { PrivateDealsComponent } from './private-deals/private-deals.component';
import { CallbackComponent } from './callback/callback.component';
import { DealService } from './deal.service';

@NgModule({
	declarations: [ AppComponent, PublicDealsComponent, PrivateDealsComponent, CallbackComponent ],
	imports: [ BrowserModule, AppRoutingModule, HttpClientModule ],
	providers: [ DealService, AuthService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
