import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User = {
    username: '',
    email: '',
    password: '',
  };

  private apiUrl: string = 'http://127.0.0.1:8000/auth';

  private http: HttpClient = inject(HttpClient);

  public resetUser(): void {
    this.user = {
      username: '',
      email: '',
      password: '',
    };
  }

  public registerUser(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, data);
  }
}
