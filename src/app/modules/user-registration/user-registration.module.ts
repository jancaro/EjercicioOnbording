import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRegistrationRoutingModule } from './user-registration-routing.module';
import { UserRegistrationComponent } from './user-registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoryModule} from "../category/category.module";


@NgModule({
  declarations: [
    UserRegistrationComponent
  ],
  imports: [
    CommonModule,
    UserRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserRegistrationModule { }
