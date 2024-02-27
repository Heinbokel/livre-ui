import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs'
import { BooksListDisplayComponent } from "../books-list-display/books-list-display.component";
import { AddBookComponent } from "../add-book/add-book.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [MatToolbarModule, MatIconModule, MatTabsModule, BooksListDisplayComponent, AddBookComponent]
})
export class DashboardComponent {
    selectedTab: number = 0;

}
