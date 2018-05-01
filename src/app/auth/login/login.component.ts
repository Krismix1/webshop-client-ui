import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  readonly STATUS_INVALID_FORM = 1;
  readonly STATUS_SENDING_REQUEST = 2;
  readonly STATUS_SUCCESS_LOGIN = 3;

  loginForm: FormGroup;
  status: number = 0;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitLogin(form) {
    if (!form.valid) {
      this.status = this.STATUS_INVALID_FORM;
      return;
    }

    this.status = this.STATUS_SENDING_REQUEST;
    this.authService.login(form.value.username, form.value.password)
      .subscribe(res => {
        this.status = this.STATUS_SUCCESS_LOGIN;
        this.router.navigate([this.authService.redirectUrl || 'home']);
      });
  }
}
