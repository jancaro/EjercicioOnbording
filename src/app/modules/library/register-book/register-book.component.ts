import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category/category.service";
import {Router} from "@angular/router";
import {LibraryService} from "../../../services/libray/library.service";

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.scss']
})
export class RegisterBookComponent implements OnInit {

  registerBookForm!: FormGroup;
  categoriesList: Array<any> = [];

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private libraryService: LibraryService,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => this.categoriesList = categories);
  }

  buildForm() {
    this.registerBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      resume: ['', Validators.required],
      image: ['', Validators.required],
      url: ['', Validators.required],
      public: [false, Validators.required],
      category: this.fb.array([])
    });
  }

  changeCategory(description: string, event: any) {
    if (event.target.checked) {
      this.category.push(this.fb.control(description));
    } else {
      let indexCategory = this.category.value.findIndex((category: string) => category === description);
      this.category.removeAt(indexCategory);
    }
  }

  registerBook() {
    const body = this.registerBookForm.getRawValue();
    this.libraryService.saveBook(body).subscribe(result => {
      this.registerBookForm.reset();
      this.registerBookForm.get('category')?.reset();
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

  get category() : FormArray {
    return this.registerBookForm.get('category') as FormArray;
  }

}
