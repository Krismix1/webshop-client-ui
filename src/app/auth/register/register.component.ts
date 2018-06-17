import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      passwords: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { validator: this.matchValidator })
    })
  }

  onSubmitRegister(form: FormGroup) {
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

  matchValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');
    if (!password || !confirm) return null;
    const match = password.value === confirm.value;
    return match ? null : {'mismatch': true};
  }
}
