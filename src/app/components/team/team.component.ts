import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { FirestoreService } from '../../service/firestore/firestore.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  user$: Observable<firebase.User | null>;
  allUsers: any[] = [];
  currentUser: any;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.user$ = this.authService.getUser();
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        this.firestoreService.getUserByUID(user.uid).subscribe(currentUser => {
          this.currentUser = currentUser;
        });
        this.firestoreService.getAllUsers().subscribe(users => {
          this.allUsers = users.filter(u => u.uid !== user.uid).map(u => ({ ...u, isHeartFilled: false }));
        });
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
      console.log('Logout successful');
    });
  }

  toggleHeart(user:any) {
    user.isHeartFilled = !user.isHeartFilled;
  }
}
