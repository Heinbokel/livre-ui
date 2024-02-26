import { Routes } from '@angular/router';
import { BookDisplayComponent } from './book-display/book-display.component';
import { BooksListDisplayComponent } from './books-list-display/books-list-display.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent}
];
