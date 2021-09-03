import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactive-forms';
  constructor(private fb: FormBuilder){ };

  registrationForm = this.fb.group({
    userName: ['Amirov'],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  })

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Abduqodir'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl(''),
  //   })
  // });

  loadApiData() {
    this.registrationForm.patchValue({
      userName: 'Shohruh',
      password: '123456',
      confirmPassword: '123456',
    })
  }
}
