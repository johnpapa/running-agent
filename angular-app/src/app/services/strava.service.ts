import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Activity, Athlete, BestTime, DistanceFilter } from '../models/strava.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StravaService {
  private readonly DISTANCE_FILTERS: DistanceFilter[] = [
    { name: '1 Mile', meters: 1609, tolerance: 100 },
    { name: '5K', meters: 5000, tolerance: 200 },
    { name: '10K', meters: 10000, tolerance: 300 },
    { name: '15K', meters: 15000, tolerance: 500 },
    { name: 'Half Marathon', meters: 21097, tolerance: 500 },
    { name: 'Marathon', meters: 42195, tolerance: 1000 },
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAthlete(): Observable<Athlete> {
    return this.http.get<Athlete>(`${environment.mcpServerUrl}/athlete`, {
      headers: this.getHeaders()
    });
  }

  getActivities(page: number = 1, perPage: number = 30): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${environment.mcpServerUrl}/activities`, {
      headers: this.getHeaders(),
      params: {
        page: page.toString(),
        per_page: perPage.toString()
      }
    });
  }

  getAllActivities(): Observable<Activity[]> {
    // Fetch multiple pages to get more comprehensive data
    const requests: Observable<Activity[]>[] = [];
    for (let page = 1; page <= 10; page++) {
      requests.push(this.getActivities(page, 100));
    }
    
    return new Observable(observer => {
      const allActivities: Activity[] = [];
      let completed = 0;
      
      requests.forEach((request, index) => {
        request.subscribe({
          next: (activities) => {
            allActivities.push(...activities);
            completed++;
            
            if (completed === requests.length) {
              observer.next(allActivities);
              observer.complete();
            }
          },
          error: (error) => {
            // If a page fails, continue with what we have
            completed++;
            if (completed === requests.length) {
              observer.next(allActivities);
              observer.complete();
            }
          }
        });
      });
    });
  }

  getActivity(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${environment.mcpServerUrl}/activities/${id}`, {
      headers: this.getHeaders()
    });
  }

  getBestTimes(): Observable<BestTime[]> {
    return this.getAllActivities().pipe(
      map(activities => {
        const runningActivities = activities.filter(a => 
          a.type === 'Run' || a.sport_type === 'Run'
        );
        
        const bestTimes: BestTime[] = [];
        
        this.DISTANCE_FILTERS.forEach(filter => {
          const matchingActivities = runningActivities.filter(activity => {
            const distance = activity.distance;
            return Math.abs(distance - filter.meters) <= filter.tolerance;
          });
          
          if (matchingActivities.length > 0) {
            // Sort by moving_time to find the best (fastest) time
            const best = matchingActivities.sort((a, b) => a.moving_time - b.moving_time)[0];
            
            bestTimes.push({
              distance: filter.name,
              distanceMeters: filter.meters,
              time: best.moving_time,
              pace: this.calculatePace(best.distance, best.moving_time),
              date: best.start_date_local,
              activityId: best.id,
              activityName: best.name
            });
          }
        });
        
        return bestTimes;
      })
    );
  }

  searchActivities(searchTerm: string): Observable<Activity[]> {
    return this.getAllActivities().pipe(
      map(activities => {
        if (!searchTerm) return activities;
        
        const term = searchTerm.toLowerCase();
        return activities.filter(activity => 
          activity.name.toLowerCase().includes(term) ||
          activity.type.toLowerCase().includes(term) ||
          activity.sport_type.toLowerCase().includes(term)
        );
      })
    );
  }

  private calculatePace(distanceMeters: number, timeSeconds: number): string {
    const distanceKm = distanceMeters / 1000;
    const timeMinutes = timeSeconds / 60;
    const paceMinPerKm = timeMinutes / distanceKm;
    
    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.round((paceMinPerKm - minutes) * 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')} /km`;
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  formatDistance(meters: number): string {
    const km = meters / 1000;
    return `${km.toFixed(2)} km`;
  }
}

