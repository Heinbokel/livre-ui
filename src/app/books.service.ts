import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly BASE_BOOK_URL = 'http://localhost:5000/books'

  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  private books: Book[] = [];

  constructor(private readonly _http: HttpClient) { 
    this.RetrieveBooks().subscribe({
      next: (response) => {
        
      }
    });
  }

  public GetBookSubject(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  public RetrieveBooks(): Observable<Book[]> {
    return this._http.get<Book[]>(this.BASE_BOOK_URL).pipe(
      tap((response) => {
        this.books = response;
        this.booksSubject.next(this.books);
      })
    );
  }

  public CreateBook(bookCreateRequest: { Title: any; Synopsis: any; PublicationDate: any; ISBN: any; GenreIds: number[]; AuthorIds: number[]; }): Observable<Book> {
    return this._http.post<Book>(this.BASE_BOOK_URL, bookCreateRequest).pipe(
      tap((response) => {
        this.books.push(response);
        this.booksSubject.next(this.books);
      })
    );
  }
}
