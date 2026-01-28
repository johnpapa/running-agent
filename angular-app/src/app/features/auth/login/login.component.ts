import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-login',
    imports: [CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loading = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // If already authenticated, redirect to dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  loginWithStrava(): void {
    this.loading = true;
    this.error = null;

    this.authService.getAuthUrl().subscribe({
      next: (response) => {
        // Redirect to Strava authorization page
        window.location.href = response.authUrl;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to get authorization URL. Please check if the MCP server is running.';
        console.error('Error getting auth URL:', err);
      }
    });
  }
}

