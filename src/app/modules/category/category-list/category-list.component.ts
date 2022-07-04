import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {CategoryService} from "../../../services/category/category.service";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe-decorator";
import {Subscription} from "rxjs";
import {CategoryModel} from "../../../models/category.model";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categoriesList: Array<CategoryModel> = [];
  category: Array<number> = [];
  @Input() numElementsView!: number;
  @Input() idsElementsView: Array<any> = [];
  @Output() categoryArrays = new EventEmitter<Array<number>>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    if(this.idsElementsView.length > 0) {
      if (this.numElementsView > this.idsElementsView.length)
        this.numElementsView = this.numElementsView - this.idsElementsView.length;
      else
        this.numElementsView = this.idsElementsView.length;
    }
    this.getCategories();
  }

  @AutoUnsubscribe()
  getCategories(): Subscription {
    return this.categoryService.getCategories().subscribe(categories => {
      if (this.idsElementsView.length > 0) {
        const selected = this.idsElementsView.map(element => categories.filter( (category: CategoryModel) => category.id === element)[0]);
        const otherOptions = categories.filter((element: any) => !selected.includes(element)).slice(0, this.numElementsView);
        this.categoriesList = otherOptions.concat(selected);
      } else {
        this.categoriesList = categories.slice(0, this.numElementsView);
      }
    });
  }

  changeCategory(categoryId: number, event: any) {
    if (event.target.checked) {
      this.category.push(categoryId);
    } else {
      let indexCategory = this.category.findIndex((category: number) => category === categoryId);
      this.category.splice(indexCategory, 1);
    }
    this.categoryArrays.emit(this.category);
  }

}
