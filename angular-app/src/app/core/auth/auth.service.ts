import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthToken, Athlete } from '../api/strava.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'strava_token';
  private readonly ATHLETE_KEY = 'strava_athlete';
  private currentUserSubject: BehaviorSubject<Athlete | null>;
  public currentUser: Observable<Athlete | null>;

  constructor(private http: HttpClient) {
    const storedAthlete = localStorage.getItem(this.ATHLETE_KEY);
    this.currentUserSubject = new BehaviorSubject<Athlete | null>(
      storedAthlete ? JSON.parse(storedAthlete) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Athlete | null {
    return this.currentUserSubject.value;
  }

  getAuthUrl(): Observable<{ authUrl: string }> {
    return this.http.get<{ authUrl: string }>(`${environment.apiUrl}/auth/url`);
  }

  exchangeToken(code: string): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${environment.apiUrl}/auth/token`, { code }).pipe(
      tap(token => {
        this.storeToken(token);
        if (token.athlete) {
          this.storeAthlete(token.athlete);
          this.currentUserSubject.next(token.athlete);
        }
      })
    );
  }

  refreshToken(): Observable<AuthToken> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No refresh token available');
    }

    return this.http.post<AuthToken>(`${environment.apiUrl}/auth/refresh`, {
      refresh_token: token.refresh_token
    }).pipe(
      tap(newToken => {
        this.storeToken(newToken);
      })
    );
  }

  storeToken(token: AuthToken): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  storeAthlete(athlete: Athlete): void {
    localStorage.setItem(this.ATHLETE_KEY, JSON.stringify(athlete));
  }

  getToken(): AuthToken | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token ? JSON.parse(token) : null;
  }

  getAccessToken(): string | null {
    const token = this.getToken();
    return token ? token.access_token : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    return token.expires_at > now;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ATHLETE_KEY);
    this.currentUserSubject.next(null);
  }
}
