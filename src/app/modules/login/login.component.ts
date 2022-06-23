import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  existUsername: boolean = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  verifyUsername() {
    this.userService.verifyUsername(this.loginForm.get('username')?.value).subscribe(result => this.existUsername = result.exists);
  }

  login() {
    const body = this.loginForm.getRawValue();
    this.userService.loginUser(body).subscribe( result => {
      sessionStorage.setItem('token', result.access_token);
      this.loginForm.reset();
      this.router.navigate(['/library/private']);
    });
  }

  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

}
