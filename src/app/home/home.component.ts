import { PokemonService } from './../services/pokemon.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IPokemonCard } from '../shared/cards/models/pokemon-card';
import { forkJoin } from 'rxjs';
import { PokemonSearchComponent } from '../shared/pokemon-search/pokemon-search.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  searchForm!: FormGroup;
  pokemons: IPokemonCard[]=[];
  lastSearchQuery: string = ''
  searchResults:IPokemonCard[]=[]
  isLoading!:boolean
  typeName: any[] =[]
  pokeTest: any[] =[]

  constructor(private  api:PokemonService,  private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['']
    })


  }

  ngOnInit() {
   this.loadingPokemons()


  //  const pokemonObservables = [];
  //  for (let i = 1; i <= 150; i++) {
  //    pokemonObservables.push(this.api.getPokemon(i));
  //  }

  //  forkJoin(pokemonObservables).subscribe(
  //    (data) => {
  //      this.pokemons = data;
  //      console.log(this.pokemons);
  //    },
  //    (error) => console.error(error)
  //  );
  }


  onSearchPerformed(query: string): void {
    if (query) {
      this.api.getPokemon(query).subscribe(
        (data) => {
          this.pokemons = [data]; // Atualize os Pokémon exibidos com base no resultado da pesquisa
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.pokemons = []; // Limpe os Pokémon exibidos
      this.loadMoreData()

    }

  }
  loadingPokemons(): void {
    const startIndex = this.pokemons.length + 1;
    const endIndex = startIndex + 80;


    if (this.searchQuery && this.searchQuery !== this.lastSearchQuery) {
      // Se a searchQuery estiver preenchida e for diferente da última pesquisa, busque apenas os Pokémon com nomes correspondentes à query
      this.api.getPokemonByName(this.searchQuery).subscribe(
        (data) => {
          if(Array.isArray(data)) {
            this.pokemons = [data]; // Exiba apenas o Pokémon retornado
          } else  {
            this.pokemons
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }else {

      const pokemonObservables = [];
      for (let i = startIndex; i < endIndex; i++) {
      // Se a searchQuery estiver preenchida e for diferente da última pesquisa, busque apenas os Pokémon com nomes correspondentes à query
      pokemonObservables.push(this.api.getPokemon(i));
      }

      forkJoin(pokemonObservables).subscribe(
        (data) => {
          this.pokemons = [...this.pokemons, ...data]; // Adicionar novos Pokémon à matriz existente
        },
        (error) => console.error(error)
      );
    }
  }

  loadMoreData(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.loadingPokemons()
      // Lógica de carregamento adicional aqui
      // Após o carregamento, defina isLoading como false para permitir mais carregamentos
      this.isLoading = false;
    }
  }



  @HostListener('window:scroll', ['$event'])
   onScroll(): void {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const bodyHeight = document.body.offsetHeight;

    if (scrollY + windowHeight >= bodyHeight && this.pokemons.length > 1) {
      setTimeout(() => {
        this.loadingPokemons();
      }, 2000);
    }
  }


}
