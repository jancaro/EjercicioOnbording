import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrivateLibraryComponent} from "./private-library/private-library.component";

const routes: Routes = [
  {
    path: 'private',
    component: PrivateLibraryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
