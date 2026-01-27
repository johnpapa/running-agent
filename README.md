# Running Agent 🏃

**Track your running activities and get AI-powered training insights to improve your performance.**

## Quick Start (For Users)

### 1. Open the App
Visit the deployed app or run locally (see Developer Setup below)

### 2. Connect with Strava
Click "Connect with Strava" and authorize the app to access your running data

### 3. View Your Data
- **Activities**: Search and view all your runs with detailed metrics
- **Best Times**: See your personal records for standard distances (1 Mile, 5K, 10K, Half Marathon, Marathon)
- **AI Analysis**: Get personalized training insights powered by GPT-4

### Install as App (Optional)
Make Running Agent easily accessible on any device:

- **iPhone/iPad**: 
  1. Open in Safari
  2. Tap the Share button (square with arrow)
  3. Scroll down and tap "Add to Home Screen"
  4. Tap "Add"

- **Android**: 
  1. Open in Chrome
  2. Tap the menu (three dots)
  3. Tap "Install App" or "Add to Home Screen"

- **Desktop** (Chrome/Edge): 
  1. Click the install icon in the address bar
  2. Click "Install"

The app works offline after installation and provides a native app-like experience!

---

## ✨ Features

### 🏃 Activity Tracking
- View and search all your running activities from Strava
- Real-time search and filtering
- Detailed metrics: distance, time, pace, elevation, heart rate
- Activity history with full details

### 🏆 Personal Records
- Automatic calculation of best times for standard distances:
  - 1 Mile, 5K, 10K, 15K, Half Marathon, Marathon
- Track progress over time
- See which activities set your PRs
- Pace and time display for each PR

### 🤖 AI-Powered Training Analysis
- **Goal Assessment**: Realistic goal predictions with detailed training plans
- **Training Effectiveness**: AI identifies your most and least effective workouts
- **Heart Rate Analysis**: Zone distribution, trends, and efficiency recommendations
- **Improvement Suggestions**: Personalized recommendations to get faster
- **Workout Recommendations**: Customized training plans based on your data
- **Race Analysis**: Deep insights on race performance
- **Fueling Insights**: Pattern detection from activity notes
- **Pacing Analysis**: Negative splits, bonking detection, consistency evaluation

### 📱 Progressive Web App (PWA)
- **Installable**: Add to home screen on any device
- **Offline Support**: View cached data when offline
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Fast Loading**: Service worker caching for instant load times
- **Native Feel**: Works like a native app

### 🔐 Secure Authentication
- OAuth 2.0 integration with Strava
- Secure token management via backend API
- No API secrets exposed to frontend

---

## For Developers

### Architecture

#### Frontend
- **Angular 21** with standalone components
- TypeScript with strict mode
- SCSS for modern styling with responsive breakpoints
- RxJS for reactive state management
- Service Worker for PWA capabilities

#### Backend
- **Express.js + TypeScript API**
  - Strava OAuth flow handling
  - Secure API proxy for Strava data
  - OpenAI GPT-4 integration for AI analysis
  - Comprehensive training analysis endpoints

### Prerequisites
- Node.js 18+ and npm
- Strava account with API credentials
- OpenAI API key (for AI analysis features)

### Setup Instructions

#### 1. Get Strava API Credentials
1. Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
2. Create an application
3. Note your Client ID and Client Secret
4. Set Authorization Callback Domain to `localhost` (for local development)

#### 2. Get OpenAI API Key
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Save it securely

#### 3. Set Up the Backend API
```bash
cd api
cp .env.example .env
# Edit .env with your credentials:
# - STRAVA_CLIENT_ID
# - STRAVA_CLIENT_SECRET
# - OPENAI_API_KEY
npm install
npm run dev
```

The API server will run on http://localhost:3000

#### 4. Run the Angular Application
```bash
cd angular-app
npm install
npm start
```

The app will be available at http://localhost:4200

#### 5. Build for Production
```bash
cd angular-app
npm run build
```

The production build includes:
- Service worker for PWA functionality
- Optimized bundles
- Cached assets for offline use
- Manifest for installability

### Testing

#### Unit Tests
```bash
cd angular-app
npm test
```

#### E2E Tests (Playwright)
```bash
cd angular-app
npm run test:e2e
```

Run with UI:
```bash
npm run test:e2e:ui
```

### Project Structure

```
running-agent/
├── angular-app/           # Frontend Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/      # Auth, API services (singletons)
│   │   │   ├── features/  # Feature modules
│   │   │   │   ├── activities/
│   │   │   │   ├── best-times/
│   │   │   │   ├── training-analysis/
│   │   │   │   ├── auth/
│   │   │   │   └── dashboard/
│   │   │   └── shared/    # Shared components
│   │   ├── assets/        # Static assets, icons
│   │   ├── manifest.webmanifest  # PWA manifest
│   │   └── ngsw-config.json      # Service worker config
│   └── e2e/              # Playwright E2E tests
├── api/                  # Backend Express API
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── server.ts     # Express server
│   └── .env             # Environment variables
└── docs/                # Documentation
```

### Responsive Breakpoints

The app is optimized for:
- **Desktop**: 1920px+ (full-featured layout)
- **Laptop**: 1366px-1920px (standard layout)
- **Tablet**: 768px-1024px (iPad, responsive grid)
- **Mobile**: 320px-428px (iPhone, stacked layout)

All interactive elements have minimum 44px touch targets for accessibility.

### PWA Features

- **Manifest**: Installable on all platforms
- **Service Worker**: Caches app shell and API responses
- **Offline Support**: View cached activities when offline
- **Network Strategies**:
  - App shell: Prefetch
  - API calls: Network-first with cache fallback
  - Assets: Lazy load with cache

### API Endpoints

#### Authentication
- `POST /api/auth/token` - Exchange Strava code for tokens
- `POST /api/auth/refresh` - Refresh access token

#### Strava Data
- `GET /api/strava/athlete` - Get athlete profile
- `GET /api/strava/activities` - Get activities

#### AI Analysis
- `POST /api/analysis/training` - Get training analysis
- `POST /api/analysis/goal-assessment` - Assess goal feasibility
- `POST /api/analysis/race-analysis` - Analyze race performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the style guide (see AGENTS.md)
4. Write tests for new features
5. Submit a pull request

## Style Guide

This project follows the [Angular Style Guide](https://angular.dev/style-guide) and includes:
- Feature-based structure
- Standalone components
- TypeScript strict mode
- SCSS with BEM-inspired naming
- Responsive design with mobile-first approach
- Touch-friendly UI (44px minimum targets)

See AGENTS.md for detailed coding conventions.

## License

MIT License - see LICENSE file for details

## Tech Stack

- **Frontend**: Angular 21, TypeScript, SCSS, RxJS
- **Backend**: Express.js, TypeScript, Node.js
- **APIs**: Strava API, OpenAI GPT-4
- **Testing**: Jasmine, Karma, Playwright
- **PWA**: Angular Service Worker, Web App Manifest

## Screenshots

See [screenshots/](screenshots/) directory for app screenshots across different devices.

---

Made with ❤️ for runners who want to train smarter, not just harder.
