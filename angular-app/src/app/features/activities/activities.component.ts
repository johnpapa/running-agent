import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StravaService } from '../../core/api/strava.service';
import { Activity } from '../../core/api/strava.models';

@Component({
    selector: 'app-activities',
    imports: [CommonModule, FormsModule],
    templateUrl: './activities.component.html',
    styleUrl: './activities.component.scss'
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[] = [];
  filteredActivities: Activity[] = [];
  searchTerm = '';
  loading = true;
  error: string | null = null;

  constructor(private stravaService: StravaService) { }

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.loading = true;
    this.error = null;

    this.stravaService.getActivities(1, 50).subscribe({
      next: (activities) => {
        this.activities = activities;
        this.filteredActivities = activities;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load activities';
        console.error('Error loading activities:', err);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredActivities = this.activities;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredActivities = this.activities.filter(activity =>
      activity.name.toLowerCase().includes(term) ||
      activity.type.toLowerCase().includes(term) ||
      activity.sport_type.toLowerCase().includes(term)
    );
  }

  formatDistance(meters: number): string {
    return this.stravaService.formatDistance(meters);
  }

  formatTime(seconds: number): string {
    return this.stravaService.formatTime(seconds);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getPace(distance: number, time: number): string {
    if (distance === 0) return 'N/A';
    const distanceKm = distance / 1000;
    const timeMinutes = time / 60;
    const paceMinPerKm = timeMinutes / distanceKm;
    
    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.round((paceMinPerKm - minutes) * 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')} /km`;
  }
}

