import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  @Input() registerBookForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  changeCategory(categories: any) {
    this.registerBookForm.get('category')?.setValue(categories);
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

}
