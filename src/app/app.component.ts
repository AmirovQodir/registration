import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/username.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder){ };

  get userName() {
    return this.registrationForm.get('userName')
  }
  
  get email() {
    return this.registrationForm.get('email')
  }
  get subscribe() {
    return this.registrationForm.get('subscribe')
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword')
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [null],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      })
    }, {validator: PasswordValidator});

    this.subscribe?.valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if(checkedValue){
        email?.setValidators(Validators.required);
      } else {
        email?.clearValidators()
      };
      email?.updateValueAndValidity();
    })
  }

  loadApiData() {
    this.registrationForm.patchValue({
      userName: 'Shohruh',
      password: '123456',
      confirmPassword: '123456',
    })
  }
}
