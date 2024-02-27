import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BooksService } from '../books.service';
import { Book } from '../models/book';
import { BookDisplayComponent } from "../book-display/book-display.component";
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
    selector: 'app-books-list-display',
    standalone: true,
    templateUrl: './books-list-display.component.html',
    styleUrl: './books-list-display.component.css',
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        BookDisplayComponent,
        MatGridListModule
    ]
})
export class BooksListDisplayComponent implements OnInit {

  public isLoading: boolean = true;

  public books: Book[] = [];

  constructor(private readonly _bookService: BooksService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.RetrieveBooks();
  }


  private RetrieveBooks() {
    this._bookService.GetBookSubject().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      }, error: (error) => {
        console.error(error);
        this.isLoading = false;
      }, complete: () => {
        this.isLoading = false;
      }
    });
  }
}
