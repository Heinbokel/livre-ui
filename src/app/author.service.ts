import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from './models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private readonly BASE_AUTHOR_URL = 'http://localhost:5000/authors'

  constructor(private readonly _http: HttpClient) { }

  public RetrieveAuthors(): Observable<Author[]> {
    return this._http.get<Author[]>(this.BASE_AUTHOR_URL);
  }
}
