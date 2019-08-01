import { Thumbnail } from './../shared/book';
import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Book } from '../shared/book';
import { BookFactory } from '../shared/book-factory';

@Component({
  selector: 'atbm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  @Output() submitBook = new EventEmitter<Book>();
  constructor(private fb: FormBuilder) { }

  submitForm() {
    this.submitBook.emit(this.book);

    this.bookForm.reset();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    if (this.bookForm) { return; }

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
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

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }
}
