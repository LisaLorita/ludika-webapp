import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService); 
  showError:boolean = false;
  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
});

constructor(private router: Router) {}

login(){
  console.log('Login method called'); // Para depuración
  const { email, password } = this.myForm.value;
  this.authService.login(email, password).subscribe({
      next: () => {
        this.showError = false;
        this.router.navigate(['/dashboard/home'])
      },
      error: () => { 
       this.showError = true;
  }
  });
}
}

