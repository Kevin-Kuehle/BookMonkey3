import { filter } from 'rxjs/operators';
import { Thumbnail } from './../shared/book';
import { Component, ViewChild, OnInit, OnChanges , Output, EventEmitter, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Book } from '../shared/book';
import { BookFactory } from '../shared/book-factory';

@Component({
  selector: 'atbm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnChanges {

  bookForm: FormGroup;
  @Output() submitBook = new EventEmitter<Book>();
  constructor(private fb: FormBuilder) { }

  @Input() book: Book;
  @Input() editing = false;

  submitForm() {
    console.log('Formular wurde abgeschickt');
    const formValue = this.bookForm.value;

    const authors = formValue.authors.filter( author => author );
    const thumbnails = formValue.thumbnails.filter( thumbnail => thumbnail.url );


    const isbn = this.editing ? this.book.isbn : formValue.isbn;

    const newBook: Book = {
      ...formValue,
      isbn,
      authors,
      thumbnails
    };

    console.log(newBook);

    this.submitBook.emit(newBook);
    this.bookForm.reset();

  }

  ngOnChanges() {
    this.initForm();
    this.setFormValues(this.book);
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    if (this.bookForm) { return; }

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: [
        { value: '', disabled: this.editing },
        [ Validators.required, Validators.minLength(10), Validators.maxLength(13) ]
      ],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbnailsArray([{  title: '', url: '' }]),
      published: []
    });
  }

  private buildAuthorsArray(values: string[]): FormArray {
    return this.fb.array(values, Validators.required);
  }

  private buildThumbnailsArray(values: Thumbnail[]): FormArray {
    return this.fb.array(
      values.map(t => this.fb.group(t))
    );
  }

  private addAuthorControl() {
  this.authors.push(this.fb.control(''));
  }
  private addThumbnailControl() {
    this.thumbnails.push(this.fb.group({ url: '', title: '' }));
  }

  private setFormValues(book: Book) {
    this.bookForm.patchValue(book);

    this.bookForm.setControl( 'authors', this.buildAuthorsArray( book.authors ));
    this.bookForm.setControl( 'thumbnails', this.buildThumbnailsArray(book.thumbnails));
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }
}
