import { Routes } from '@angular/router';
import { BookDisplayComponent } from './book-display/book-display.component';
import { BooksListDisplayComponent } from './books-list-display/books-list-display.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookDetailsPageComponent } from './book-details-page/book-details-page.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'books/:id', component: BookDetailsPageComponent},
    {path: '**', component: DashboardComponent}
];
