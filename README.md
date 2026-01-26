# Running Agent

An Angular application for tracking and analyzing your running activities using Strava. This application allows you to search for your running activities, view your best times for various distances (1 mile, 5K, 10K, half marathon, marathon, etc.), and authenticate securely with Strava using OAuth.

## Project Structure

```
running-agent/
├── angular-app/          # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── login/            # Strava login component
│   │   │   │   ├── auth-callback/    # OAuth callback handler
│   │   │   │   ├── dashboard/        # Main dashboard
│   │   │   │   ├── activities/       # Activities list and search
│   │   │   │   └── best-times/       # Best times display
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts   # Authentication service
│   │   │   │   └── strava.service.ts # Strava API service
│   │   │   └── models/
│   │   │       └── strava.models.ts  # TypeScript interfaces
│   │   └── environments/             # Environment configuration
│   └── package.json
├── strava-mcp-server/    # MCP Server for Strava API
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── README.md
└── README.md
```

## Features

### 🏃 Activity Tracking
- View all your running activities from Strava
- Search activities by name, type, or sport
- See detailed stats: distance, time, pace, elevation
- View kudos and comments count

### 🏆 Best Times
- Automatically calculate your best times for:
  - 1 Mile
  - 5K
  - 10K
  - 15K
  - Half Marathon (21.1K)
  - Marathon (42.2K)
- See pace, date, and activity name for each personal record

### 🔐 Secure Authentication
- OAuth integration with Strava
- Secure token management
- Automatic token refresh

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v8 or higher)
- A Strava account
- Strava API credentials (Client ID and Client Secret)

## Setup Instructions

### 1. Get Strava API Credentials

1. Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
2. Create a new application
3. Set the **Authorization Callback Domain** to `localhost`
4. Note your **Client ID** and **Client Secret**

### 2. Configure the MCP Server

```bash
cd strava-mcp-server
cp .env.example .env
```

Edit `.env` and add your Strava credentials:
```env
STRAVA_CLIENT_ID=your_client_id_here
STRAVA_CLIENT_SECRET=your_client_secret_here
REDIRECT_URI=http://localhost:4200/auth/callback
PORT=3001
```

Install dependencies and start the server:
```bash
npm install
npm run dev
```

The MCP server will run on `http://localhost:3001`

### 3. Set Up the Angular Application

```bash
cd angular-app
npm install
npm start
```

The Angular app will run on `http://localhost:4200`

## Usage

1. **Start the MCP Server**: Make sure the Strava MCP server is running on port 3001
2. **Start the Angular App**: Launch the Angular application on port 4200
3. **Login with Strava**: Click "Connect with Strava" on the login page
4. **Authorize**: Approve the permissions on Strava's authorization page
5. **View Your Data**: 
   - Navigate to the "Activities" tab to search and view your runs
   - Switch to "Best Times" to see your personal records

## API Endpoints (MCP Server)

- `GET /health` - Health check
- `GET /auth/url` - Get Strava OAuth authorization URL
- `POST /auth/token` - Exchange authorization code for access token
- `POST /auth/refresh` - Refresh access token
- `GET /athlete` - Get authenticated athlete profile
- `GET /activities` - Get athlete activities (with pagination)
- `GET /activities/:id` - Get specific activity details
- `GET /athlete/stats` - Get athlete statistics

## Technologies Used

### Frontend (Angular)
- Angular 19 (with security patches)
- TypeScript
- SCSS for styling
- Standalone components
- RxJS for reactive programming
- HttpClient for API communication

### Backend (MCP Server)
- Node.js
- Express.js
- TypeScript
- Axios for HTTP requests
- CORS support
- dotenv for environment variables

## Development

### Building the MCP Server

```bash
cd strava-mcp-server
npm run build
npm start
```

### Building the Angular App

```bash
cd angular-app
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Troubleshooting

### "Failed to get authorization URL"
- Ensure the MCP server is running on port 3001
- Check that your `.env` file is configured correctly

### "Authentication Failed"
- Verify your Strava API credentials are correct
- Make sure the redirect URI matches exactly: `http://localhost:4200/auth/callback`
- Check the browser console for detailed error messages

### "No activities found"
- Ensure you have activities in your Strava account
- Check that the access token has the correct scopes (`activity:read_all`)

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

John Papa

## Acknowledgments

- Strava API for providing access to activity data
- Model Context Protocol (MCP) for standardized API integration
