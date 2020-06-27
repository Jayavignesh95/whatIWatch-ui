import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchdataService } from '../searchdata.service';
import { Inject} from   '@angular/core';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

/*
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
}) */

@Component({
  selector: 'app-search',
  templateUrl:'./search.component.html',
  styleUrls: ['./search.component.css']
})



@Injectable()
export class SearchComponent implements OnInit {

  movies: any[]= [];
  SelectedMovie :any;


 queryField: FormControl = new FormControl();

 constructor( @Inject(SearchdataService)  private _searchService: SearchdataService,private httpClient:HttpClient) { }
ngOnInit() {

  //.subscribe(response => console.log(response)));
}

getSuggestionList()
{

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
}
});
}
getSelectedMovieInfo()
{
alert(this.SelectedMovie);
 this.httpClient.get("http://localhost:8090/movieInfo/info/?id="+this.SelectedMovie).subscribe(data => {
  console.log(data);

 })
}

setMovieInfo(data :any){
 // alert("selected value is "+data);
 this.SelectedMovie =data;
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
