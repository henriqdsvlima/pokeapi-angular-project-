import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
})

export class PokemonSearchComponent implements OnInit {
 @Output() searchPerformed: EventEmitter<string> = new EventEmitter<string>()
 searchForm!: FormGroup;

 constructor(private formBuilder: FormBuilder, private api:PokemonService, ) {}

 ngOnInit(): void {
   this.searchForm = this.formBuilder.group({
     searchQuery: ['']
   });
   this.searchForm
      .get('searchQuery')
      ?.valueChanges.pipe(debounceTime(1000))
      .subscribe((query: string) => {
        this.performSearch(query);
      });

 }
 performSearch(query: string): void {
  this.searchPerformed.emit(query);
}

onSearchPerformed(): void {
  const query = this.searchForm.get('searchQuery')?.value;
  console.log(query);
  this.searchPerformed.emit(query);
}

}


