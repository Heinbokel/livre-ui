import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Book } from '../models/book';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Observable, map, startWith } from 'rxjs';
import { Author } from '../models/author';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { AuthorsService } from '../author.service';
import { GenresService } from '../genre.service';
import { Genre } from '../models/genre';
import { BooksService } from '../books.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [MatSnackBarModule, DatePipe, CommonModule, MatOptionModule, AsyncPipe, MatAutocompleteModule, MatIconModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {

  public form: FormGroup;

  authorsControl = new FormControl();
  filteredAuthors: Observable<Author[]>;
  authors: Author[] = [];
  selectedAuthors: Author[] = [];

  genresControl = new FormControl();
  filteredGenres: Observable<Genre[]>;
  genres: Genre[] = [];
  selectedGenres: Genre[] = [];
  isLoading: boolean;

  constructor(private readonly _authorService: AuthorsService, private readonly _genreService: GenresService,
     private readonly _bookService: BooksService, private datePipe: DatePipe, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {

    this._authorService.RetrieveAuthors().subscribe({
      next: (authors) => {
        this.authors = authors;
      }, error: (error) => {
        console.error(error);
      }
    });

    this._genreService.RetrieveGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
      }, error: (error) => {
        console.error(error);
      }
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.minLength(1), Validators.maxLength(150), Validators.required]),
      isbn: new FormControl('', [Validators.minLength(10), Validators.maxLength(13), Validators.required]),
      synopsis: new FormControl('', [Validators.minLength(10), Validators.maxLength(255), Validators.required]),
      publicationDate: new FormControl('', Validators.required),
      authors: new FormControl(),
      genres: new FormControl()
    });

    this.filteredAuthors = this.authorsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterAuthors(value))
    );

    this.filteredGenres = this.genresControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGenres(value))
    );
  }

  private _filterAuthors(value: string | Author): Author[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.firstName.concat(value.lastName).toLowerCase();
    return this.authors.filter(author => !this.selectedAuthors.includes(author) && author.firstName.concat(author.lastName).toLowerCase().includes(filterValue));
  }

  displayFn(author: Author): string {
    return author ? author.firstName + ' ' + author.lastName : '';
  }

  onAuthorSelect(author: Author) {
    this.selectedAuthors.push(author);
  }

  removeAuthor(author: Author) {
    this.selectedAuthors.splice(this.selectedAuthors.indexOf(author), 1);
  }

  private _filterGenres(value: string | Genre): Genre[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase();
    return this.genres.filter(genre => !this.selectedGenres.includes(genre) && genre.name.toLowerCase().includes(filterValue));
  }

  displayGenreFn(genre: Genre): string {
    return genre ? genre.name : '';
  }

  onGenreSelect(genre: Genre) {
    this.selectedGenres.push(genre);
  }

  removeGenre(genre: Genre) {
    this.selectedGenres.splice(this.selectedGenres.indexOf(genre), 1);
  }
  
  public submitForm() {
    this.isLoading = true;

    const formattedDate = this.datePipe.transform(this.form.controls['publicationDate'].value, 'yyyy-MM-dd');

    const bookCreateRequest = {
      Title: this.form.controls['title'].value,
      Synopsis: this.form.controls['synopsis'].value,
      PublicationDate: formattedDate,
      ISBN: this.form.controls['isbn'].value,
      GenreIds: this.selectedGenres.map(x => x.id),
      AuthorIds: this.selectedAuthors.map(x => x.id)
    };

    this._bookService.CreateBook(bookCreateRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        this._snackBar.open(`Book ${response.title} was successfully created!`, 'Great!');
      }, error: (error) => {
        this.isLoading = false;
        this._snackBar.open("Could not create book. Response code " + error.error.status + ": " + error.error.title, "Close");
      }
    });

  }

}
