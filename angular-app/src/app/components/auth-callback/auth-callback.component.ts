import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent implements OnInit {
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const errorParam = params['error'];

      if (errorParam) {
        this.error = 'Authorization denied';
        this.loading = false;
        return;
      }

      if (code) {
        this.exchangeToken(code);
      } else {
        this.error = 'No authorization code received';
        this.loading = false;
      }
    });
  }

  private exchangeToken(code: string): void {
    this.authService.exchangeToken(code).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to authenticate. Please try again.';
        console.error('Error exchanging token:', err);
      }
    });
  }

  retry(): void {
    this.router.navigate(['/login']);
  }
}

