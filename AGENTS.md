# Running Agent - Development Guidelines & Style Guide

This document outlines the development standards, coding conventions, and best practices for the Running Agent project. These guidelines ensure consistency, maintainability, and quality across the codebase.

## Table of Contents
- [Angular Style Guide](#angular-style-guide)
- [Project Structure](#project-structure)
- [TypeScript Guidelines](#typescript-guidelines)
- [Component Guidelines](#component-guidelines)
- [Service Guidelines](#service-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Git Workflow](#git-workflow)
- [Code Review Standards](#code-review-standards)

## Angular Style Guide

This project follows the **[John Papa Angular Style Guide](https://angular.io/guide/styleguide)** with additional conventions specific to our application.

### Key Principles

1. **Single Responsibility**: One component, service, or module per file
2. **Feature-Based Structure**: Organize by feature, not by type
3. **Naming Conventions**: Clear, descriptive, and consistent names
4. **Small Functions**: Functions should do one thing well
5. **LIFT Principle**:
   - **L**ocate code quickly
   - **I**dentify code at a glance
   - **F**lat structure as long as possible
   - **T**ry to stay DRY (Don't Repeat Yourself)

## Project Structure

### Feature-Based Organization

```
src/app/
├── core/                          # Singleton services, guards, interceptors
│   ├── auth/
│   │   ├── auth.service.ts
│   │   └── auth.models.ts
│   └── api/
│       ├── strava.service.ts
│       └── strava.models.ts
├── features/                      # Feature modules
│   ├── auth/
│   │   ├── login/
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.scss
│   │   └── auth-callback/
│   │       ├── auth-callback.component.ts
│   │       ├── auth-callback.component.html
│   │       └── auth-callback.component.scss
│   ├── dashboard/
│   │   ├── dashboard.component.ts
│   │   ├── dashboard.component.html
│   │   └── dashboard.component.scss
│   ├── activities/
│   │   ├── activities.component.ts
│   │   ├── activities.component.html
│   │   ├── activities.component.scss
│   │   └── activities.models.ts
│   ├── best-times/
│   │   ├── best-times.component.ts
│   │   ├── best-times.component.html
│   │   └── best-times.component.scss
│   └── training-analysis/
│       ├── training-analysis.component.ts
│       ├── training-analysis.component.html
│       ├── training-analysis.component.scss
│       ├── ai-analysis.service.ts
│       └── ai-analysis.models.ts
└── shared/                        # Shared components, directives, pipes
    └── (future shared components)
```

### Directory Guidelines

- **core/**: Singleton services used throughout the app (auth, API services)
- **features/**: Feature-specific components and services
- **shared/**: Reusable components, directives, and pipes

### Naming Conventions

#### Files
```
feature-name.component.ts         # Component class
feature-name.component.html       # Component template
feature-name.component.scss       # Component styles
feature-name.component.spec.ts    # Component tests
feature-name.service.ts           # Service class
feature-name.models.ts            # TypeScript interfaces/types
```

#### Classes and Interfaces
```typescript
// Components - PascalCase with Component suffix
export class LoginComponent { }
export class ActivitiesComponent { }

// Services - PascalCase with Service suffix
export class AuthService { }
export class StravaService { }

// Interfaces - PascalCase, no prefix
export interface Activity { }
export interface Athlete { }

// Types - PascalCase
export type DistanceFilter = { ... }
```

#### Variables and Functions
```typescript
// camelCase for variables and functions
const accessToken = 'abc123';
const currentUser = null;

function getActivities() { }
function calculateBestTimes() { }
```

## TypeScript Guidelines

### Strict Mode
Always use TypeScript strict mode (enabled in `tsconfig.json`):
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Type Annotations
```typescript
// ✅ Good - Explicit types
function getAthlete(): Observable<Athlete> {
  return this.http.get<Athlete>(`${this.apiUrl}/athlete`);
}

const activities: Activity[] = [];
const distance: number = 5000;

// ❌ Bad - Implicit any
function getData() {
  return this.http.get(`${this.apiUrl}/data`);
}
```

### Interfaces Over Types
Prefer interfaces for object shapes:
```typescript
// ✅ Good
export interface Activity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
}

// ❌ Avoid for simple objects
export type Activity = {
  id: number;
  name: string;
}
```

### Null Checks
Always handle null/undefined:
```typescript
// ✅ Good
const token = this.authService.getToken();
if (token) {
  this.makeRequest(token);
}

// Use optional chaining
const athleteName = this.currentUser?.firstname ?? 'Unknown';

// ❌ Bad
const token = this.authService.getToken();
this.makeRequest(token); // Could be null!
```

## Component Guidelines

### Standalone Components
Use standalone components (Angular 14+):
```typescript
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent { }
```

### Component Lifecycle
Order lifecycle hooks logically:
```typescript
export class MyComponent implements OnInit, OnDestroy {
  // 1. Input/Output properties
  @Input() data: any;
  @Output() dataChange = new EventEmitter();

  // 2. Public properties
  public isLoading = false;

  // 3. Private properties
  private subscription: Subscription;

  // 4. Constructor
  constructor(private service: MyService) { }

  // 5. Lifecycle hooks
  ngOnInit(): void { }
  ngOnDestroy(): void { }

  // 6. Public methods
  public handleClick(): void { }

  // 7. Private methods
  private loadData(): void { }
}
```

### Template Best Practices
```html
<!-- ✅ Good - Use async pipe -->
<div *ngIf="activities$ | async as activities">
  <div *ngFor="let activity of activities">
    {{ activity.name }}
  </div>
</div>

<!-- ✅ Good - TrackBy for performance -->
<div *ngFor="let activity of activities; trackBy: trackByActivityId">
  {{ activity.name }}
</div>

<!-- ❌ Bad - Manual subscription in component -->
<div *ngIf="activities">
  <div *ngFor="let activity of activities">
    {{ activity.name }}
  </div>
</div>
```

### Component Size
- Keep components under 400 lines
- Extract complex logic to services
- Break down large templates into smaller components

## Service Guidelines

### Injectable Services
Always use `providedIn: 'root'` for singleton services:
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
}
```

### Observable Patterns
```typescript
// ✅ Good - Return observables
getActivities(): Observable<Activity[]> {
  return this.http.get<Activity[]>(`${this.apiUrl}/activities`);
}

// ✅ Good - Use BehaviorSubject for state
private currentUserSubject = new BehaviorSubject<Athlete | null>(null);
public currentUser$ = this.currentUserSubject.asObservable();

// ✅ Good - Use operators for transformation
getActivities(): Observable<Activity[]> {
  return this.http.get<Activity[]>(`${this.apiUrl}/activities`).pipe(
    map(activities => activities.filter(a => a.type === 'Run')),
    catchError(this.handleError)
  );
}
```

### Error Handling
Implement consistent error handling:
```typescript
private handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'An error occurred';
  
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  
  console.error(errorMessage);
  return throwError(() => new Error(errorMessage));
}
```

## Testing Guidelines

### Unit Tests
Write tests for:
- All services
- All components with business logic
- All pipes and directives
- Edge cases and error scenarios

```typescript
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should exchange token', () => {
    const mockToken = { access_token: 'abc123' };
    
    service.exchangeToken('code123').subscribe(token => {
      expect(token).toEqual(mockToken);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/token`);
    expect(req.request.method).toBe('POST');
    req.flush(mockToken);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
```

### E2E Tests (Playwright)
Write E2E tests for:
- Critical user flows (login, view activities)
- Navigation between pages
- Form submissions
- Error states

```typescript
test('should display activities', async ({ page }) => {
  await page.goto('/dashboard');
  
  // Check activities tab
  await page.click('text=Activities');
  await expect(page.locator('.activity-card')).toBeVisible();
  
  // Check search functionality
  await page.fill('input[type="search"]', 'Morning Run');
  await expect(page.locator('.activity-card')).toContainText('Morning Run');
});
```

### Test Coverage Goals
- **Services**: 80%+ coverage
- **Components**: 70%+ coverage
- **Overall**: 75%+ coverage

## Git Workflow

### Branch Naming
```
feature/add-goal-assessment
bugfix/fix-activity-loading
refactor/improve-service-structure
docs/update-readme
```

### Commit Messages
Follow conventional commits:
```
feat: add goal assessment feature
fix: resolve activity loading issue
refactor: improve service structure
docs: update README with setup instructions
test: add unit tests for auth service
chore: update dependencies
```

### Pull Requests
- Keep PRs focused and small
- Write clear descriptions
- Link related issues
- Request reviews from team members
- Ensure all tests pass before merging

## Code Review Standards

### Review Checklist
- [ ] Code follows style guide
- [ ] Tests are included and passing
- [ ] No console.log statements (use proper logging)
- [ ] Error handling is implemented
- [ ] Documentation is updated
- [ ] No hardcoded values (use environment config)
- [ ] Accessibility considerations (ARIA labels, keyboard navigation)
- [ ] Performance considerations (avoid unnecessary subscriptions)

### Code Quality
```typescript
// ✅ Good
export class ActivityComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.stravaService.getActivities()
      .pipe(takeUntil(this.destroy$))
      .subscribe(activities => this.activities = activities);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// ❌ Bad - Memory leak
export class ActivityComponent implements OnInit {
  ngOnInit(): void {
    this.stravaService.getActivities()
      .subscribe(activities => this.activities = activities);
    // No unsubscribe!
  }
}
```

## SCSS Guidelines

### Component Styles
Use component-scoped styles:
```scss
// activities.component.scss
:host {
  display: block;
  padding: 20px;
}

.activity-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.activity-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
```

### Variables and Mixins
Define in global styles or dedicated files:
```scss
// styles.scss
$primary-color: #fc4c02;
$secondary-color: #1976d2;
$success-color: #4caf50;
$error-color: #f44336;

$border-radius: 8px;
$spacing-unit: 8px;
```

## Accessibility

### ARIA Labels
```html
<!-- ✅ Good -->
<button aria-label="Connect with Strava" (click)="login()">
  <img src="strava-icon.svg" alt="">
  Connect with Strava
</button>

<!-- ✅ Good -->
<input 
  type="search" 
  placeholder="Search activities..."
  aria-label="Search activities"
  [(ngModel)]="searchTerm">
```

### Keyboard Navigation
Ensure all interactive elements are keyboard accessible:
```html
<div 
  class="activity-card" 
  tabindex="0" 
  (click)="viewActivity(activity)"
  (keyup.enter)="viewActivity(activity)"
  role="button">
  {{ activity.name }}
</div>
```

## Performance Best Practices

### Change Detection
Use OnPush where possible:
```typescript
@Component({
  selector: 'app-activity-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`
})
export class ActivityCardComponent { }
```

### TrackBy Functions
Always use trackBy for *ngFor:
```typescript
trackByActivityId(index: number, activity: Activity): number {
  return activity.id;
}
```

### Lazy Loading
Lazy load feature modules:
```typescript
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  }
];
```

## Security Best Practices

### API Keys
Never hardcode API keys:
```typescript
// ✅ Good - Use environment config
import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;

// ❌ Bad
const apiUrl = 'http://localhost:3000';
```

### Sanitization
Sanitize user input:
```typescript
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) { }

getSafeUrl(url: string) {
  return this.sanitizer.sanitize(SecurityContext.URL, url);
}
```

## Documentation

### Component Documentation
```typescript
/**
 * Component for displaying and managing running activities.
 * Fetches activities from Strava API and provides search/filter functionality.
 * 
 * @example
 * <app-activities></app-activities>
 */
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent { }
```

### Service Documentation
```typescript
/**
 * Service for authenticating with Strava OAuth 2.0.
 * Handles token exchange, storage, and refresh.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Exchanges authorization code for access token.
   * @param code - Authorization code from Strava OAuth callback
   * @returns Observable of AuthToken containing access and refresh tokens
   */
  exchangeToken(code: string): Observable<AuthToken> {
    // ...
  }
}
```

## Resources

### Official Documentation
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [RxJS Documentation](https://rxjs.dev/)
- [Playwright Documentation](https://playwright.dev/)

### Community Resources
- [John Papa's Angular Style Guide](https://github.com/johnpapa/angular-styleguide)
- [Angular Best Practices](https://angular.io/guide/best-practices)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Tools
- **Linting**: ESLint with Angular rules
- **Formatting**: Prettier
- **Testing**: Jasmine, Karma, Playwright
- **Documentation**: Compodoc

## Contributing

When contributing to this project:

1. **Read these guidelines** thoroughly
2. **Follow the style guide** consistently
3. **Write tests** for new features
4. **Update documentation** as needed
5. **Submit focused PRs** with clear descriptions
6. **Be open to feedback** during code review

## Questions?

If you have questions about these guidelines:
1. Check the official Angular documentation
2. Review existing code for examples
3. Ask in pull request discussions
4. Consult with team members

---

**Remember**: These guidelines exist to maintain code quality and consistency. When in doubt, follow the principle of least surprise—write code that other developers will easily understand.
