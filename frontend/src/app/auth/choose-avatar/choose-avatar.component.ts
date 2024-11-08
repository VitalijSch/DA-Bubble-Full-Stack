import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  public selectedAvatar: string | ArrayBuffer | null = './../../../assets/images/avatar_default.png';

  private authService: AuthService = inject(AuthService);

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
        this.selectedAvatar = reader.result;
        this.authService.user.profile_image = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  public signinUser(): void {
    // if (this.isDefaultAvatar) {
      const formData = new FormData();
      const user = this.authService.user;
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('password', user.password);
      if (typeof user.profile_image === 'string') {
        formData.append('profile_image', user.profile_image);
      }
      console.log(formData)
      // this.addUser(formData);
    // }
  }

  get isDefaultAvatar(): boolean {
    return this.selectedAvatar !== null && typeof this.selectedAvatar === 'string' && this.selectedAvatar.includes('default');
  }
}
