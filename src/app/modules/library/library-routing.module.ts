import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrivateLibraryComponent} from "./private-library/private-library.component";
import {RegisterBookComponent} from "./register-book/register-book.component";
import {ViewBookComponent} from "./view-book/view-book.component";

const routes: Routes = [
  {
    path: 'private',
    component: PrivateLibraryComponent
  },
  {
    path: 'book/register',
    component: RegisterBookComponent
  },
  {
    path: 'book/view/:id',
    component: ViewBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
