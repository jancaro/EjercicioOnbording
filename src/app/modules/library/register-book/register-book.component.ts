import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category/category.service";
import {Router} from "@angular/router";
import {LibraryService} from "../../../services/libray/library.service";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe-decorator";
import {CategoryModel} from "../../../models/category.model";

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.scss']
})
export class RegisterBookComponent implements OnInit {

  registerBookForm!: FormGroup;
  categoriesList: Array<CategoryModel> = [];

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private libraryService: LibraryService,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  @AutoUnsubscribe()
  getCategories(): Subscription {
    return this.categoryService.getCategories().subscribe(categories => this.categoriesList = categories);
  }

  buildForm() {
    this.registerBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      resume: ['', Validators.required],
      image: ['', Validators.required],
      url: ['', Validators.required],
      public: [false, Validators.required],
      category: [[]]
    });
  }

  changeCategory(categories: Array<number>) {
    this.registerBookForm.get('category')?.setValue(categories);
  }

  @AutoUnsubscribe()
  registerBook(): Subscription {
    const body = this.registerBookForm.getRawValue();
    return this.libraryService.saveBook(body).subscribe(result => {
      this.registerBookForm.reset();
      this.cancel();
    });
  }

  cancel() {
    this.router.navigate(['/library/private']);
  }

  get title(): FormControl {
    return this.registerBookForm.get('title') as FormControl;
  }

  get author(): FormControl {
    return this.registerBookForm.get('author') as FormControl;
  }

  get resume(): FormControl {
    return this.registerBookForm.get('resume') as FormControl;
  }

  get image(): FormControl {
    return this.registerBookForm.get('image') as FormControl;
  }

  get url(): FormControl {
    return this.registerBookForm.get('url') as FormControl;
  }

  get public(): FormControl {
    return this.registerBookForm.get('public') as FormControl;
  }

  get category() : FormControl {
    return this.registerBookForm.get('category') as FormControl;
  }

}
