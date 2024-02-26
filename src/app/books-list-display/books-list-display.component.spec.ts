import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListDisplayComponent } from './books-list-display.component';

describe('BooksListDisplayComponent', () => {
  let component: BooksListDisplayComponent;
  let fixture: ComponentFixture<BooksListDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksListDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
