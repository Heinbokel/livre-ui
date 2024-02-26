import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from './models/author';
import { Genre } from './models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private readonly BASE_GENRE_URL = 'http://localhost:5000/genres'

  constructor(private readonly _http: HttpClient) { }

  public RetrieveGenres(): Observable<Genre[]> {
    return this._http.get<Genre[]>(this.BASE_GENRE_URL);
  }
}