import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs'
import { BooksListDisplayComponent } from "../books-list-display/books-list-display.component";

@Component({
    selector: 'app-toolbar',
    standalone: true,
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.css',
    imports: [MatToolbarModule, MatIconModule, MatTabsModule, BooksListDisplayComponent]
})
export class ToolbarComponent {

}
