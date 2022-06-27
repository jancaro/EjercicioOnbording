import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {BookModel} from "../../../models/book.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe-decorator";
import {Subscription} from "rxjs";
import {CategoryService} from "../../../services/category/category.service";
import {LibraryService} from "../../../services/libray/library.service";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {

  bookSelected: BookModel = {
    title: '',
    author: '',
    resume: '',
    image: '',
    url: '',
    public: false,
    category: []
  };
  updateBookForm!: FormGroup;
  categoriesList: Array<any> = [];
  categoriesView: Array<any> = [];
  id!: string;
  edit: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private categoryService: CategoryService,
              private libraryService: LibraryService) {
  }

  ngOnInit(): void {
    this.getIdBook();
    this.getCategories();
    this.getBook();
  }

  buildForm() {
    this.updateBookForm = this.fb.group({
      title: [ this.bookSelected.title, Validators.required],
      author: [ this.bookSelected.author, Validators.required],
      resume: [ this.bookSelected.resume, Validators.required],
      image: [ this.bookSelected.image, Validators.required],
      url: [ this.bookSelected.url, [Validators.required, Validators.pattern("^https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*$")]],
      public: [ this.bookSelected.public, Validators.required],
      category: [ this.categoriesView, Validators.required ]
    });
  }

  @AutoUnsubscribe()
  getIdBook(): Subscription {
    return this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  @AutoUnsubscribe()
  getCategories(): Subscription {
    return this.categoryService.getCategories().subscribe(categories => this.categoriesList = categories);
  }

  @AutoUnsubscribe()
  getBook(): Subscription {
    return this.libraryService.getBook(this.id).subscribe(result => {
      this.bookSelected = result;
      this.categoriesView = result.category.map((item: any) => this.categoriesList.filter(category => category.id === item)[0].description);
      this.buildForm();
    });
  }

  changeCategory(categories: any) {
    this.updateBookForm.get('category')?.setValue(categories);
  }

  cancel() {
    this.router.navigate(['/library/private']);
  }

  showEdit() {
    this.edit = true;
  }

  get title(): FormControl {
    return this.updateBookForm.get('title') as FormControl;
  }

  get author(): FormControl {
    return this.updateBookForm.get('author') as FormControl;
  }

  get resume(): FormControl {
    return this.updateBookForm.get('resume') as FormControl;
  }

  get image(): FormControl {
    return this.updateBookForm.get('image') as FormControl;
  }

  get url(): FormControl {
    return this.updateBookForm.get('url') as FormControl;
  }

  get public(): FormControl {
    return this.updateBookForm.get('public') as FormControl;
  }

  get category() : FormControl {
    return this.updateBookForm.get('category') as FormControl;
  }

}
