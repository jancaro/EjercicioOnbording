import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService} from "../../services/user/user.service";
import {CategoryService} from "../../services/category/category.service";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  registerForm!: FormGroup;
  categoriesList: Array<any> = [];
  existUsername: boolean = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private categoryService: CategoryService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => this.categoriesList = categories);
  }

  verifyUsername() {
    this.userService.verifyUsername(this.registerForm.get('name')?.value).subscribe(result => this.existUsername = result.exists);
  }

  buildForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern("^(?=.*\\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,16}$")]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern("^(?=.*\\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,16}$")]],
      categories: this.fb.array([])
    });
  }

  changeCategory(description: string, event: any) {
    if (event.target.checked) {
      this.categories.push(this.fb.control(description));
    } else {
      let indexCategory = this.categories.value.findIndex((category: string) => category === description);
      this.categories.removeAt(indexCategory);
    }
  }

  registerUser() {
    const body = this.registerForm.getRawValue();
    delete body.confirmPassword;
    this.userService.registerUser(body).subscribe( result => this.registerForm.reset());
  }

  get name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  get categories() : FormArray {
    return this.registerForm.get('categories') as FormArray;
  }

}
