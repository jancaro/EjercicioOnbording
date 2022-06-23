import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category/category.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LibraryService} from "../../../services/libray/library.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-private-library',
  templateUrl: './private-library.component.html',
  styleUrls: ['./private-library.component.scss']
})
export class PrivateLibraryComponent implements OnInit {

  categoriesList: Array<any> = [];
  myBooksList:  Array<any> = [];
  filterForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private libraryService: LibraryService,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getBooks();
  }

  buildForm() {
    this.filterForm = this.fb.group({
      title: [''],
      category: ['']
    });
  }

  addBook() {
    this.router.navigate(['/library/book/register']);
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => this.categoriesList = categories);
  }

  getBooks() {
    const body = this.filterForm.getRawValue();
    this.libraryService.getFilterBooks(body).subscribe(result => this.myBooksList = result.items);
  }

  filterBooks() {
    const body = this.filterForm.getRawValue();
    console.log('***************************' + body);
    this.libraryService.getFilterBooks(body).subscribe(result => this.myBooksList = result.items);
  }
}
