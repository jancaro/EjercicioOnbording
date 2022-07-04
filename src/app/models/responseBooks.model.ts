import {BookModel} from "./book.model";

export interface ResponseBooksModel {
  count: number,
  items: Array<BookModel>
}
