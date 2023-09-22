import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IPokemonCard } from 'src/app/shared/cards/models/pokemon-card';
import { IPokemonRegion } from 'src/app/shared/cards/models/pokemon-region';
import { PokemonTypeAPI } from 'src/app/shared/cards/models/pokemon-type';
import { FiltroService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  pokemons$!: Observable<IPokemonCard[]>
  @Output() searchPerformed: EventEmitter<string> = new EventEmitter<string>();
  //forms
  searchForm!: FormGroup;
  filterForm!: FormGroup;

  //variables
  searchQuery: string = '';
  lastSearchQuery: string = '';
  pokemons: IPokemonCard[] = [];
  searchResults: IPokemonCard[] = [];
  types: string[] = [];
  generations: string[] = [];
  filteredPokemons: any[] = [];

  constructor(private api: PokemonService, private formBuilder: FormBuilder, private http:HttpClient,private filter:FiltroService) {
    this.filterForm = this.filter.filterForm;

    this.searchForm = this.formBuilder.group({
      searchQuery: [''],
    });
    // this.filterForm = this.formBuilder.group({
    //   type: [''],
    //   generation: [''],
    // });
  }

  ngOnInit() {
    this.loadingPokemons();
    // this.loadingTypes();
    // this.loadingRegions();
    this.http.get('https://pokeapi.co/api/v2/type').subscribe((res: any) => {
      this.types = res.results.map((type: { name: any; }) => type.name);
    });

    this.http.get('https://pokeapi.co/api/v2/generation').subscribe((res: any) => {
      this.generations = res.results.map((generation: { name: any; }) => generation.name);
    });


    this.api.getPokemons().subscribe(
      (data) => {
        this.pokemons = data;
        console.log(this.pokemons);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchPokemon() {
    const type = this.filter.filterForm.get('type')?.value
    const gen = this.filter.filterForm.get('generation')?.value

    console.log('Type:', type);
    console.log('Gen:', gen);

    this.http.get(`https://pokeapi.co/api/v2/generation/${gen}`).subscribe((res:any) => {
      const pokemonsOfGen = res.pokemon_species.map((species: { name: any; }) => species.name);
    })
    this.http.get(`https://pokeapi.co/api/v2/type/${type}`).subscribe((res: any) => {
      const pokemonsOfType = res.pokemon.map((pokemonWrapper: { pokemon: { name: any; }; }) => pokemonWrapper.pokemon.name);      // Agora você tem uma lista de pokemons do tipo escolhido.
      console.log(pokemonsOfType);
      // Você pode filtrar ainda mais para a geração escolhida, se for necessário.
      // A geração não é diretamente acessível pela PokeAPI, então você terá que fazer uma lógica de filtro aqui.
    });
  }

  onTypeChange(selectElement: HTMLSelectElement) {
    const value = selectElement.value;
    this.filterForm.get('type')?.setValue(value);
  }

  onSearchPerformed(query: string): void {
    if (query) {
      this.api.getPokemon(query).subscribe(
        (data) => {
          this.pokemons = [data]; // Atualize os Pokémon exibidos com base no resultado da pesquisa
          this.pokemons = [data];
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.pokemons = []; // Limpe os Pokémon exibidos
      this.loadingPokemons();
    }
    this.searchPerformed.emit(query);
  }

  getFilteredPokemons(): void {
    this.api.getPokemons().subscribe(pokemons => {
      this.filteredPokemons = pokemons;
      // this.applyFilters();
    });
  }




  // applyFilters() {
  //   // Certifique-se de que this.filteredPokemons seja um array antes de usar o filter
  //   if (Array.isArray(this.filteredPokemons)) {
  //     this.filteredPokemons = this.pokemons.filter((pokemon: IPokemonCard) => {
  //       // Aplicar os filtros aqui
  //       // Exemplo: Filtrar por tipo e região
  //       const typeFilter = this.filterForm.get('type')?.value;
  //       const regionFilter = this.filterForm.get('region')?.value;

  //       // Lógica de filtragem
  //       if (typeFilter && pokemon.types !== typeFilter) {
  //         return false;
  //       }

  //       if (regionFilter && pokemon.region !== regionFilter) {
  //         return false;
  //       }

  //       return true;
  //     });
  //   }
  // }
  loadingPokemons(): void {
    const startIndex = this.pokemons.length + 1;
    const endIndex = startIndex + 4;

    if (this.searchQuery && this.searchQuery !== this.lastSearchQuery) {
      // Se a searchQuery estiver preenchida e for diferente da última pesquisa, busque apenas os Pokémon com nomes correspondentes à query
      this.api.getPokemonByName(this.searchQuery).subscribe(
        (data) => {
          this.pokemons = [data]; // Exiba apenas o Pokémon retornado
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      const pokemonObservables = [];
      for (let i = startIndex; i < endIndex; i++) {
        // Se a searchQuery estiver preenchida e for diferente da última pesquisa, busque apenas os Pokémon com nomes correspondentes à query
        pokemonObservables.push(this.api.getPokemon(i).pipe());
      }

      forkJoin(pokemonObservables).subscribe(
        (data) => {
          this.pokemons = [...this.pokemons, ...data]; // Adicionar novos Pokémon à matriz existente
          console.log(this.pokemons);
        },
        (error) => console.error(error)
      );
    }
  }

  // loadingTypes(): void {
  //   this.api.getPokemonByType().subscribe((response: PokemonTypeAPI[]) => {
  //     this.typeName = response;
  //   });
  // }

  // loadingRegions(): void {
  //   this.api.getPokemonByRegion().subscribe((res: IPokemonRegion[]) => {
  //     this.region = res;
  //   });
  // }
}
