import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe-decorator";

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

  @AutoUnsubscribe()
  verifyUsername(): Subscription {
    return this.userService.verifyUsername(this.loginForm.get('username')?.value).subscribe(result => this.existUsername = result.exists);
  }

  @AutoUnsubscribe()
  login(): Subscription {
    const body = this.loginForm.getRawValue();
    return this.userService.loginUser(body).subscribe( result => {
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
