import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { PrivateLibraryComponent } from './private-library/private-library.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LibraryHeaderComponent } from './library-header/library-header.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookContainerComponent } from './book-container/book-container.component';
import { RegisterBookComponent } from './register-book/register-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import {CategoryModule} from "../category/category.module";
import { BookFormComponent } from './book-form/book-form.component';
import { PublicLibraryComponent } from './public-library/public-library.component';


@NgModule({
  declarations: [
    PrivateLibraryComponent,
    LibraryHeaderComponent,
    BookCardComponent,
    BookContainerComponent,
    RegisterBookComponent,
    ViewBookComponent,
    BookFormComponent,
    PublicLibraryComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryModule { }
