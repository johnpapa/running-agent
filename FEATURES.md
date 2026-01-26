# Running Agent - Features

## Overview

Running Agent is a comprehensive Angular application that integrates with Strava to help runners track their activities and personal records. Built with Angular 17 and a custom Model Context Protocol (MCP) server, it provides a modern, responsive interface for analyzing your running performance.

## Core Features

### 🔐 Secure Authentication

**OAuth 2.0 Integration with Strava**
- Secure OAuth flow for Strava authentication
- Token management with automatic storage
- Session persistence across page refreshes
- Secure logout functionality
- No password storage - everything handled by Strava

**Benefits:**
- Industry-standard security
- One-click login experience
- Your Strava credentials remain with Strava
- Revokable access at any time from Strava settings

### 🏃 Activity Tracking

**Comprehensive Activity View**
- View all your running activities from Strava
- Real-time search across activity names and types
- Rich activity cards with detailed metrics
- Sortable and filterable data

**Activity Metrics Displayed:**
- Distance (km/miles)
- Moving time
- Average pace
- Elevation gain
- Kudos received
- Comments count
- Activity date and time

**Search Capabilities:**
- Search by activity name
- Search by sport type
- Real-time filtering as you type
- Clear and intuitive "no results" messaging

### 🏆 Personal Records Dashboard

**Automatic Best Times Calculation**
The app automatically analyzes all your activities to find your best times for standard race distances:

**Supported Distances:**
1. **1 Mile** (~1.6 km)
2. **5K** (5 kilometers)
3. **10K** (10 kilometers)
4. **15K** (15 kilometers)
5. **Half Marathon** (21.1 km)
6. **Marathon** (42.2 km)

**For Each Personal Record:**
- Fastest completion time
- Average pace per kilometer
- Date achieved
- Link to the original activity
- Activity name

**Smart Matching:**
- Intelligent distance tolerance for GPS variations
- Focuses on "Run" activities only
- Shows only verified personal bests

### 🎨 Modern User Interface

**Design Highlights:**
- Clean, modern design inspired by Strava's aesthetic
- Gradient accent colors (Strava orange/red)
- Card-based layout for easy scanning
- Smooth animations and transitions
- Professional iconography using SVG icons

**Responsive Design:**
- Mobile-first approach
- Tablet-optimized layouts
- Desktop-optimized wide screens
- Touch-friendly buttons and controls
- No horizontal scrolling on any device

### 📊 Data Visualization

**Activity Cards:**
- Visual separation of metrics
- Icon-based quick reference
- Color-coded activity types
- Elevation profiles (when available)

**Best Times Grid:**
- Card-based layout for each distance
- Star badges for personal records
- Gradient headers for visual appeal
- Hover effects for interactivity

### 🔄 Real-Time Updates

**Live Data:**
- Fetches fresh data from Strava on each visit
- Pagination support for large activity histories
- Efficient API usage with proper caching

### 🛡️ Error Handling

**User-Friendly Error Messages:**
- Clear error states when server is unavailable
- Retry options for failed requests
- Helpful setup instructions
- Network error detection

**Loading States:**
- Spinner animations during data fetching
- "Analyzing activities" message for calculations
- Progress indicators for long operations

## Technical Features

### Architecture

**Frontend:**
- Angular 17 with standalone components
- TypeScript for type safety
- SCSS for styling
- RxJS for reactive programming
- HttpClient for API communication

**Backend:**
- Custom MCP server built with Express.js
- TypeScript-based server implementation
- RESTful API design
- CORS enabled for development
- Environment-based configuration

### API Integration

**Strava API Endpoints Used:**
- `/oauth/authorize` - User authorization
- `/oauth/token` - Token exchange
- `/api/v3/athlete` - Athlete profile
- `/api/v3/athlete/activities` - Activity list
- `/api/v3/activities/:id` - Activity details

**MCP Server Endpoints:**
- `GET /health` - Server health check
- `GET /auth/url` - Get OAuth URL
- `POST /auth/token` - Exchange authorization code
- `POST /auth/refresh` - Refresh access token
- `GET /athlete` - Get athlete profile
- `GET /activities` - Get activities with pagination
- `GET /activities/:id` - Get specific activity
- `GET /athlete/stats` - Get athlete statistics

### Performance Optimizations

**Efficient Data Loading:**
- Paginated activity fetching
- Lazy loading of components
- Optimized bundle sizes
- Tree-shaking for unused code

**Caching Strategy:**
- LocalStorage for token persistence
- Session management
- Reduced API calls

### Development Features

**Developer Experience:**
- Hot module replacement
- TypeScript strict mode
- ESLint configuration
- Standalone component architecture
- Environment-based configuration

## Future Enhancements (Potential)

### Analytics
- Monthly/yearly running statistics
- Distance progression charts
- Pace improvement tracking
- Training volume analysis

### Social Features
- Compare with friends
- Share achievements
- Activity comments integration
- Club activities view

### Advanced Filtering
- Filter by date range
- Filter by distance range
- Filter by pace
- Filter by elevation

### Export Features
- Export activities to CSV
- Export best times report
- GPX file downloads
- Training log PDF generation

### Goal Setting
- Set distance goals
- Set time goals
- Progress tracking
- Achievement badges

### Training Plans
- Marathon training plans
- 5K/10K training programs
- Custom workout builder
- Training calendar integration

## Accessibility

**WCAG Compliance Considerations:**
- Semantic HTML structure
- Keyboard navigation support
- Color contrast ratios
- Screen reader friendly
- ARIA labels on interactive elements

## Browser Support

**Fully Tested:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile Browsers:**
- iOS Safari 14+
- Chrome Mobile
- Firefox Mobile

## Security

**Security Measures:**
- OAuth 2.0 for authentication
- No password storage
- Token stored in localStorage with encryption
- CORS configuration
- Environment variable protection
- No sensitive data in client code

## Privacy

**Data Handling:**
- Only reads data with explicit user permission
- No data stored on servers (stateless)
- All data fetched directly from Strava
- User can revoke access at any time
- Compliant with Strava API Terms of Service

---

For installation and setup instructions, see [README.md](README.md).  
For quick start guide, see [QUICKSTART.md](QUICKSTART.md).  
For testing checklist, see [TESTING.md](TESTING.md).
