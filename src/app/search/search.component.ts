import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchdataService } from '../searchdata.service';
import { Inject} from   '@angular/core';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';

/* 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
}) */

@Component({
  selector: 'app-search',
  template: `

  <div class="srchContainer">
  <form class="example-form" class="srchForm">
    <mat-form-field  appearance="fill" id="srchField">
      <input matInput [formControl]="queryField" [matAutocomplete]="auto" focus panelClass="testClass">
      <mat-autocomplete #auto="matAutocomplete" style="    margin-left: 30%;" >
        <mat-option *ngFor="let movie of movies" [value]="movie" class="srchRes" >
          {{movie}}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  </form>

  <h1>Hello</h1>
  <h1>Hello</h1>
  <h1>Hello</h1>
  <h1>Hello</h1>
  <h1>Hello</h1>
  
  </div>` ,
  styleUrls: ['./search.component.css']
})



@Injectable()
export class SearchComponent implements OnInit {

  movies: any[]= [];

 queryField: FormControl = new FormControl();

 constructor( @Inject(SearchdataService)  private _searchService: SearchdataService) { }
ngOnInit() {
  this.queryField.valueChanges
  .pipe(
    debounceTime(200),
    switchMap((queryField) =>  this._searchService.search(queryField)),
    distinctUntilChanged()
    )
  .subscribe( result => { if (result.status === 400) { return; } else {  
    var temp = (result.json());
    console.log("temp "+temp.length);
    this.movies = temp;
    console.log(this.movies[2])
}
});

  //.subscribe(response => console.log(response)));
}

myplaceHolder: string = 'Search Movie'

checkPlaceHolder() {
  if (this.myplaceHolder) {
    this.myplaceHolder = null
    return;
  } else {
    this.myplaceHolder = 'Search Movie '
    return
  }
}

}
