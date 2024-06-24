import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { FirestoreService } from '../../service/firestore/firestore.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<firebase.User | null>;
  userData: any = {};

  constructor(private authService: AuthService, private firestoreService: FirestoreService, private router: Router) {
    this.user$ = this.authService.getUser();
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        this.firestoreService.getUserByUID(user.uid).subscribe(userData => {
          this.userData = userData;
        });
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
      console.log("Logout successful");
    });
  }

  redirectToTeamPage() {
    this.router.navigate(['/team']);
  }

}
