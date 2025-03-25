import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../utils/passwordMatchValidator';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private router: Router) {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: passwordMatchValidator }
    );
  }

  registerSubmit() {
    console.log('Register form submitted');
    if (this.registerForm.valid) {
      console.log('Form is valid', this.registerForm.value);
      this.registerForm.markAllAsTouched(); 
      this.authService.registerUser(this.registerForm.value).subscribe(
        (res: { token: string; }) => {
          console.log('Response received', res);
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Error: No token received in response');
          }
        },
        (error: any) => {
          console.error('Registration failed:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  printErrors() {
    const controls = this.registerForm.controls;
    for (const controllerName in controls) {
      const control = controls[controllerName];
      if (control.invalid && control.touched) {
        const errors = control.errors;
        if (errors) {
          console.log(`${controllerName} has the following errors:`);
          for (const error in errors) {
            console.log(`- ${error}: ${JSON.stringify(errors[error])}`);
          }
        }
      }
    }
  }
}
