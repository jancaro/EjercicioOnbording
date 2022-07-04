import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category/category.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LibraryService} from "../../../services/libray/library.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe-decorator";
import {BookFilterModel} from "../../../models/bookFilter.model";
import {CategoryModel} from "../../../models/category.model";

@Component({
  selector: 'app-private-library',
  templateUrl: './private-library.component.html',
  styleUrls: ['./private-library.component.scss']
})
export class PrivateLibraryComponent implements OnInit {

  categoriesList: Array<CategoryModel> = [
    {
      id: -1,
      description: 'Todas'
    }
  ];
  myBooksList:  Array<any> = [];
  filterForm!: FormGroup;
  userId!: string;
  filterFormModel!: BookFilterModel;

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private libraryService: LibraryService,
              private router: Router) {
    this.buildForm();
    this.userId = sessionStorage.getItem('userId')!.toString();
  }

  ngOnInit(): void {
    const body = this.getBody();
    this.getBooks(body);
    this.getCategories();
  }

  @AutoUnsubscribe()
  buildForm(): Subscription {
    this.filterForm = this.fb.group({
      title: [''],
      category: [[-1]]
    });

    return this.filterForm.valueChanges.subscribe(() => {
      const body = this.getBody();
      this.getBooks(body);
    });
  }

  addBook() {
    this.router.navigate(['/library/book/register']);
  }

  getBody(): FormGroup {
    const body = this.filterForm.getRawValue();
    const categoryValue = Number(body.category);
    body.category = categoryValue === -1 ? [] : [categoryValue];
    return body;
  }

  viewBook(event: any) {
    this.router.navigate([`/library/book/view/${event.id}`]);
  }

  @AutoUnsubscribe()
  getCategories(): Subscription {
    return this.categoryService.getCategories().subscribe(categories => this.categoriesList = this.categoriesList.concat(categories));
  }

  @AutoUnsubscribe()
  getBooks(body: FormGroup): Subscription {
    this.filterFormModel = body.getRawValue();
    return this.libraryService.getFilterBooks(this.filterFormModel).subscribe(result => this.myBooksList = result.items.filter((book: any ) => book.userRegister === this.userId));
  }
}
