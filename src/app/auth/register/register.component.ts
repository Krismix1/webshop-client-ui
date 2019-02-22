import { Component, OnInit, Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'

/** Error when invalid control is dirty, or mismatched. or submitted. */
// From: https://github.com/angular/material2/issues/8513
@Injectable()
export class MismatchErrorStateMatcher implements ErrorStateMatcher {

  constructor (private defaultMatcher: ErrorStateMatcher) { }

  isErrorState (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidParent = control !== null && control.dirty && control.parent.invalid
    return (this.defaultMatcher.isErrorState(control, form) || invalidParent)
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  hidePassword = true
  hideConfirmPassword = true
  isSubmitted = false

  constructor (private fb: FormBuilder) { }

  ngOnInit () {
    this.createForm()
  }

  createForm () {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.matchValidator })
    })
    this.registerForm.statusChanges.subscribe(() => this.isSubmitted = false)
  }

  onSubmitRegister (form: FormGroup) {
    // TODO: See about creating a specific class and add isSubmitted property
    this.isSubmitted = true
    if (form.valid) {
      console.log('valid form', form)
      // TODO: send request
    } else {
      console.log('invalid form', form)
      // TODO: show feedback
    }
  }

  matchValidator (control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password')
    const confirm = control.get('confirmPassword')
    if (!password || !confirm) { return null }
    const match = password.value === confirm.value
    return match ? null : { mismatch: true }
  }
}
