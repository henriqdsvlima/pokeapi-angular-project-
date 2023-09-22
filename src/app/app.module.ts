import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './shared/cards/cards.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { PokemonSearchComponent } from './shared/pokemon-search/pokemon-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layouts/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PokemonSearchComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardsComponent,
    HttpClientModule,
    ScrollingModule,
    ReactiveFormsModule,
    //standalones

  ],
  exports:[PokemonSearchComponent],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
export { HomeComponent };

