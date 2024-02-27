import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BooksService } from '../books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-book-details-page',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatSnackBarModule, MatCardModule, MatIconModule, DatePipe, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './book-details-page.component.html',
  styleUrl: './book-details-page.component.css'
})
export class BookDetailsPageComponent implements OnInit {
    book: Book;

    isLoading: boolean;

    constructor(private readonly _bookService: BooksService, private readonly _activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar, private _router: Router){}

    ngOnInit(): void {
      this.isLoading = true;
      let bookId: string | null;
      this._activatedRoute.paramMap.subscribe({
        next: (paramMap) => {
          bookId = paramMap.get('id');
          this._bookService.RetrieveBookByBookId(bookId).subscribe({
            next: (book) => {
              this.book = book;
              this.isLoading = false;
            }, error: (error) => {
              this._snackBar.open(`Book with ID ${bookId} could not be retrieved: ${error.error.status}: ${error.error.title}`, 'OK');
              this.isLoading = false;
            }
          });
        }
      });
    
    }

    NavigateToHome() {
      this._router.navigateByUrl('/');
    }

    DeleteBook() {
      this.isLoading = true;
      this._bookService.DeleteBook(this.book.id).subscribe({
        next: (response) => {
          this.isLoading = false;
          this._snackBar.open(`Book ${this.book.title} was successfully deleted`, 'Great!');
          this._router.navigateByUrl('/');
        }, error: (error) => {
          this._snackBar.open(`Book with ID ${this.book.id} could not be deleted: ${error.error.status}: ${error.error.title}`, 'OK');
          this.isLoading = false;
        }
      });
    }
}
