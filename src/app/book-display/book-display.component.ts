import { Component, Input } from '@angular/core';
import { Book } from '../models/book';
import {MatCardModule} from '@angular/material/card';
import { DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-book-display',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './book-display.component.html',
  styleUrl: './book-display.component.css'
})
export class BookDisplayComponent {
  @Input() book: Book;
}
