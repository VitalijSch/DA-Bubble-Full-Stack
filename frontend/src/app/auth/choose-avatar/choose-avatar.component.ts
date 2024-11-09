import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-choose-avatar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './choose-avatar.component.html',
  styleUrl: './choose-avatar.component.scss'
})
export class ChooseAvatarComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  public selectedFile: File | null = null;
  public selectedAvatar: string | ArrayBuffer = './../../../assets/images/avatar_default.png';

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  constructor() {
    console.log(this.authService.user)
  }

  public selectAvatar(index: number): void {
    this.selectedAvatar = `./../../../assets/images/avatar_${index}.png`;
  }

  public onUploadButtonClick(): void {
    this.fileInput.nativeElement.click();
  }

  public onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.selectedAvatar = reader.result;
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  public createUser(): void {
    if (!this.isDefaultAvatar) {
      const formData = new FormData();
      const user = this.authService.user;
      console.log(user)
      formData.append('name', user.username);
      formData.append('email', user.email);
      formData.append('password', user.password);
      if (this.selectedFile) {
        formData.append('profile_image', this.selectedFile);
      }
      this.signinUser(formData);
    }
  }

  public signinUser(formData: FormData): void {
    this.authService.registerUser(formData).subscribe({
      next: () => {
        this.authService.resetUser();
        this.selectedFile = null;
        this.selectedAvatar = './../../../assets/images/avatar_default.png';
        this.router.navigate(['auth/login']);
      },
      error: (error) => {
        console.error('Registrierungsfehler:', error);
      }
    });
  }

  get isDefaultAvatar(): boolean {
    return typeof this.selectedAvatar === 'string' && this.selectedAvatar.includes('default');
  }
}
