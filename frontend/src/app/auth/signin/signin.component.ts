import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  public isChecked: boolean = false;
  public showCheckboxError: boolean = false;
  public signinForm: FormGroup;

  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  constructor() {
    this.signinForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public userData(): void {
    if (!this.isChecked) {
      this.showCheckboxError = true;
    } else {
      this.showCheckboxError = false;
    }
    if (this.signinForm.valid && this.isChecked) {
      let user = this.authService.user;
      user.name = this.signinForm.get('name')?.value;
      user.email = this.signinForm.get('email')?.value;
      user.password = this.signinForm.get('password')?.value
      this.authService.user = user;
      this.router.navigate(['/auth/choose-avatar']);
    }
  }

  public toggleIsChecked(): void {
    this.isChecked = !this.isChecked;
    if(this.isChecked) {
      this.showCheckboxError = false;
    } else {
      this.showCheckboxError = true;
    }
  }
}
