import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RegistrationService } from './registration.service';
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
  submitted = false;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService){ };

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

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmails() {
    this.alternateEmails.push(this.fb.control(''))
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
      }),
      alternateEmails: this.fb.array([])
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

  onSubmit() {
    this.registrationService.register(this.registrationForm.value)
    .subscribe(
      response => {
        this.submitted = true; 
        console.log("Success!", response)},
      error => console.log('Error!', error)
      )
  }
}
