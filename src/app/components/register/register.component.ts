import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { FirestoreService } from '../../service/firestore/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  fullName: string = '';
  phone: string = '';
  applicationFor: string = '';
  salary: number = 0;
  about: string = '';

  constructor(private authService: AuthService,  private firestoreService: FirestoreService, private router: Router) {}

  onSubmit() {
    this.authService
      .register(this.email, this.password)
      .then((response) => {
        const user = {
          email: this.email,
          fullName: this.fullName,
          phone: this.phone,
          applicationFor: this.applicationFor,
          salary: this.salary,
          about: this.about,
          uid: response.user?.uid
        };
        this.firestoreService.createUser(user).then(() => {
          console.log('User data saved to Firestore');
          this.router.navigate(['/profile']);
        });
      })
      .catch((err) => {
        console.error('Registration error:', err);
      });
  }

  isFormInvalid(): boolean {
    return this.email === '' || this.fullName === '' || this.phone === '' || this.applicationFor === '' || this.salary === 0 || this.about === '' || this.password === '';
  }

}
