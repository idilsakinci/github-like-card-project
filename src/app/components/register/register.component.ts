import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService
      .register(this.email, this.password)
      .then((response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        console.error('Registration error:', err);
      });
  }
}
