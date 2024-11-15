import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  showError: boolean = false;

  register() {
    if (this.myForm.invalid) {
      return;
    }
    const { name, email, password } = this.myForm.value;

    this.authService.register(name, email, password).subscribe({
      next: () => {
        console.log('Usuario creado correctamente');
        Swal.fire('Usuario creado correctamente', '', 'success');
        this.showError = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.showError = true;
      },
    });
  }
}
