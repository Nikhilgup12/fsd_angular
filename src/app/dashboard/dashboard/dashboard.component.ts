import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../profiles/services/profile.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  createProfileButton = false;
  constructor(private profileService: ProfileService, private router: Router ) {}

  createProfile() {
    this.router.navigate(['/profiles/create-profile']);
  }

  ngOnInit(): void {
    console.log('Inside the dashboard and OnInit');
    this.profileService.getCurrentUserProfile().subscribe(
      (res) => {
        console.log('success...' + res);
        localStorage.setItem('profile', JSON.stringify(res));
  },
  (err) => {
    this.createProfileButton = true;
    console.log('error...' + err);
  }
);
}
}
