import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from './../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  readonly STATUS_INVALID_FORM = 1
  readonly STATUS_SENDING_REQUEST = 2
  readonly STATUS_SUCCESS_LOGIN = 3
  readonly STATUS_NETWORK_ERROR = 4
  readonly STATUS_CUSTOM_MESSAGE = 5

  loginForm
  status = 0
  hidePassword = true
  message: String = ''

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.loginForm.statusChanges.subscribe(() => this.loginForm.isSubmitted = false)
  }

  onSubmitLogin(form) {
    // TODO: See about creating a specific class and add isSubmitted property
    form.isSubmitted = true
    if (!form.valid) {
      this.status = this.STATUS_INVALID_FORM
      return
    }

    this.status = this.STATUS_SENDING_REQUEST
    this.authService.login(form.value.email, form.value.password)
      .subscribe({
        next: val => {
          this.status = this.STATUS_SUCCESS_LOGIN
          this.router.navigate([this.authService.redirectUrl || 'home'])
        },
        error: msg => {
          console.log({'debug': msg})
          this.status = this.STATUS_CUSTOM_MESSAGE
          this.message = msg
        }
      }) // TODO: Make some feedback
  }
}
