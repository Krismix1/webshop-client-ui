import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, or mismatched. or submitted. */
// From: https://github.com/angular/material2/issues/8513
@Injectable()
export class MismatchErrorStateMatcher implements ErrorStateMatcher {

  constructor(private defaultMatcher: ErrorStateMatcher) { }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // const isSubmitted = form && form.submitted;
    // return this.defaultMatcher.isErrorState(control, form) || (control && control.invalid && ((control.dirty && control.errors.mismatch) || isSubmitted));
    const invalidParent = control && control.dirty && control.parent.invalid;
    return this.defaultMatcher.isErrorState(control, form) || invalidParent;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private fb: FormBuilder, private matcher: MismatchErrorStateMatcher) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.matchValidator })
    })
    this.registerForm.statusChanges.subscribe(() => this.registerForm.isSubmitted = false)
  }

  onSubmitRegister(form: FormGroup) {
    form.isSubmitted = true
    if (form.valid) {
      console.log('valid form', form);
      //send request
    } else {
      console.log('invalid form', form);
      // show feedback
    }
  }

  // matchValidator(group: FormGroup): any {
  //   return group.get('password').value === group.get('confirmPassword').value
  //     ? null : { 'mismatch': true };
  // }

  matchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');
    if (!password || !confirm) return null;
    const match = password.value === confirm.value;
    return match ? null : { mismatch: true };
  }
}
