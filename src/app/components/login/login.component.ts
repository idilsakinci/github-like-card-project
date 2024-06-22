import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService
      .login(this.email, this.password)
      .then((response) => {
        console.log("Login successful");
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        console.error("Something went wrong", err);
      });
  }
}
