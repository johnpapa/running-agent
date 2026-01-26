import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StravaService } from '../../services/strava.service';
import { Athlete } from '../../models/strava.models';
import { ActivitiesComponent } from '../activities/activities.component';
import { BestTimesComponent } from '../best-times/best-times.component';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, ActivitiesComponent, BestTimesComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  athlete: Athlete | null = null;
  activeTab: 'activities' | 'bestTimes' = 'activities';
  loading = true;

  constructor(
    private authService: AuthService,
    private stravaService: StravaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadAthlete();
  }

  loadAthlete(): void {
    this.stravaService.getAthlete().subscribe({
      next: (athlete) => {
        this.athlete = athlete;
        this.authService.storeAthlete(athlete);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading athlete:', err);
        this.loading = false;
        // If token is expired or invalid, redirect to login
        if (err.status === 401) {
          this.logout();
        }
      }
    });
  }

  setActiveTab(tab: 'activities' | 'bestTimes'): void {
    this.activeTab = tab;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

