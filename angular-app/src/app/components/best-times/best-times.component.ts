import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StravaService } from '../../services/strava.service';
import { BestTime } from '../../models/strava.models';

@Component({
  selector: 'app-best-times',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-times.component.html',
  styleUrl: './best-times.component.scss'
})
export class BestTimesComponent implements OnInit {
  bestTimes: BestTime[] = [];
  loading = true;
  error: string | null = null;

  constructor(private stravaService: StravaService) { }

  ngOnInit(): void {
    this.loadBestTimes();
  }

  loadBestTimes(): void {
    this.loading = true;
    this.error = null;

    this.stravaService.getBestTimes().subscribe({
      next: (times) => {
        this.bestTimes = times;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load best times';
        console.error('Error loading best times:', err);
        this.loading = false;
      }
    });
  }

  formatTime(seconds: number): string {
    return this.stravaService.formatTime(seconds);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  }
}

