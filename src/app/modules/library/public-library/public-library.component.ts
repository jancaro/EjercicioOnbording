import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category/category.service";
import {LibraryService} from "../../../services/libray/library.service";
import {Router} from "@angular/router";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe-decorator";
import {Subscription} from "rxjs";
import {BookModel} from "../../../models/book.model";
import {BookFilterModel} from "../../../models/bookFilter.model";

@Component({
  selector: 'app-public-library',
  templateUrl: './public-library.component.html',
  styleUrls: ['./public-library.component.scss']
})
export class PublicLibraryComponent implements OnInit {

  myBooksList:  Array<BookModel> = [];
  userId!: string;
  filterForm!: BookFilterModel;


  constructor(private categoryService: CategoryService,
              private libraryService: LibraryService,
              private router: Router) {
    this.userId = sessionStorage.getItem('userId')!.toString();
  }

  ngOnInit(): void {
    this.filterForm = {
      title: '',
      category: []
    }
    this.getBooks(this.filterForm);
  }

  viewBook(event: any) {
    this.router.navigate([`/library/book/view/${event.id}`]);
  }

  @AutoUnsubscribe()
  getBooks(body: BookFilterModel): Subscription {
    return this.libraryService.getFilterBooks(body).subscribe(result => this.myBooksList = result.items.filter((book: BookModel ) => book.public));
  }

}
