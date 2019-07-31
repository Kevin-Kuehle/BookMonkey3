import { BookStoreService } from './../shared/book-store.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { filter, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Book } from '../shared/book';

@Component({
  selector: 'atbm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keyUp$ = new Subject<string>();
  isLoading = false;
  foundBooks: Book[] = [];
  constructor(private bs: BookStoreService) {  }

  ngOnInit() {
    this.keyUp$.pipe(
      filter(term => term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.bs.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false)

    ).subscribe(books => this.foundBooks = books);
  }

}
