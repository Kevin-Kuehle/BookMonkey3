import { TokenInterceptor } from './shared/token-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { BookFormComponent } from './book-form/book-form.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { FormMessagesComponent } from './form-messages/form-messages.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailsComponent,
    BookListItemComponent,
    HomeComponent,
    SearchComponent,
    BookFormComponent,
    CreateBookComponent,
    FormMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DateValueAccessorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
