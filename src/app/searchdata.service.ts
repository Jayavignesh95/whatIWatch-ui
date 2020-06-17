import { Injectable } from '@angular/core';

import { HttpModule, Http } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';


@Injectable()
export class SearchdataService {

 // clientID: string = 'PAST YOUR CLIENT ID';
baseUrl: string = 'http://localhost:8090/movie/search/?' + 'query=';


constructor(@Inject(Http) private _http: Http) { }
search(queryString: string) {
  let _URL = this.baseUrl + queryString;
  return this._http.get(_URL);
}

}
