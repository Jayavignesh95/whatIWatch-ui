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
    <mat-form-field  appearance="outline" id="srchField">
    <mat-label>Movie Name</mat-label>  
    <input matInput placeHolder="Enter Movie Name" [formControl]="queryField" [matAutocomplete]="auto" focus panelClass="testClass" id="queryField">
      <mat-autocomplete #auto="matAutocomplete">
        <mat-option *ngFor="let movie of movies" [value]="movie.name" class="srchRes" >
          {{movie.name}}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  </form>
  
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
    console.log("result is "+result.json());
    var temp = (result.json());
    console.log("temp "+temp.length);
   
    this.movies = result.json().MovieList;
   // this.movies =['Ironman','Iron Man2'];
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
