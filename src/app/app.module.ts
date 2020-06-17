import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SearchdataService } from './searchdata.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule,MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
         
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    MatAutocompleteModule,
    MatInputModule,
    
  ],

  
 
  providers: [SearchdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
