import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookModel} from "../../../models/book.model";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() bookModel!: BookModel;

  @Output() clickEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  clickImage(option: BookModel) {
    this.clickEvent.emit(option);
  }

}
