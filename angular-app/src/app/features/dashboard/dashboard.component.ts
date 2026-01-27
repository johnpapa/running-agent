import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { StravaService } from '../../core/api/strava.service';
import { Athlete } from '../../core/api/strava.models';
import { ActivitiesComponent } from '../activities/activities.component';
import { BestTimesComponent } from '../best-times/best-times.component';
import { TrainingAnalysisComponent } from '../training-analysis/training-analysis.component';
import { InstallPromptComponent } from '../../shared/components/install-prompt/install-prompt.component';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, ActivitiesComponent, BestTimesComponent, TrainingAnalysisComponent, InstallPromptComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  athlete: Athlete | null = null;
  activeTab: 'activities' | 'bestTimes' | 'analysis' = 'activities';
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

  setActiveTab(tab: 'activities' | 'bestTimes' | 'analysis'): void {
    this.activeTab = tab;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

