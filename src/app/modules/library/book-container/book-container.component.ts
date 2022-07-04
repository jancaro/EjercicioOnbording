import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookModel} from "../../../models/book.model";

@Component({
  selector: 'app-book-container',
  templateUrl: './book-container.component.html',
  styleUrls: ['./book-container.component.scss']
})
export class BookContainerComponent implements OnInit {

  @Input() myBooks: Array<BookModel> = [];

  @Output() clickImgEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  clickImg(event: any) {
    this.clickImgEvent.emit(event);
  }

}
