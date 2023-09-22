import { IPokemonRegion } from './../shared/cards/models/pokemon-region';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemonCard } from '../shared/cards/models/pokemon-card';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { PokemonTypeAPI } from '../shared/cards/models/pokemon-type';



@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  typesData: any = {};

  constructor(private http: HttpClient) {}
  private url = 'https://pokeapi.co/api/v2/pokemon';
  getPokemonData(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getPokemon(name: string | number): Observable<IPokemonCard> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.http.get<IPokemonCard>(url);
  }

  getPokemons(): Observable<IPokemonCard[]> {
    const url = 'https://pokeapi.co/api/v2/pokemon';
    return this.http.get<IPokemonCard[]>(url);
  }

  getPokemonByName(name: string): Observable<IPokemonCard> {
    // Utilize o endpoint de busca por nome da API
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    return this.http.get<IPokemonCard>(url);
  }

  getPokemonByType(): Observable<PokemonTypeAPI[]> {
    return this.http
      .get<PokemonTypeAPI[]>('https://pokeapi.co/api/v2/type/')
      .pipe(map((response: any) => response['results']));
  }

  getPokemonByRegion(): Observable<IPokemonRegion[]> {
   return  this.http.get<IPokemonRegion[]>('https://pokeapi.co/api/v2/region')
   .pipe(
    map((res:any) => res['results'])
   )
  }
}
