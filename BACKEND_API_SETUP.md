# Backend API Setup

This application uses a custom Express.js backend API server that handles Strava OAuth authentication and provides AI-powered analysis using OpenAI GPT-4.

## Architecture Overview

The backend API serves as a secure proxy between the Angular frontend and external services:
- **Strava API**: OAuth flow, athlete data, activities, and detailed metrics
- **OpenAI API**: GPT-4 powered training analysis and insights

This architecture keeps API credentials secure on the server side and prevents exposing sensitive keys to the frontend.

## API Server Features

- **Authentication**: Complete OAuth 2.0 flow with Strava
- **Data Proxy**: Secure access to Strava athlete and activity data
- **AI Analysis**: Comprehensive training insights using OpenAI GPT-4
  - Heart rate zone analysis
  - Fueling pattern detection
  - Pacing analysis (negative splits, bonking)
  - Goal feasibility assessment
  - Performance optimization recommendations

## Setup Instructions

### 1. Get Strava API Credentials

1. Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
2. Click "Create an App" or use an existing application
3. Fill in the required fields:
   - **Application Name**: Running Agent
   - **Category**: Training
   - **Website**: http://localhost:4200
   - **Authorization Callback Domain**: `localhost`
4. Save your **Client ID** and **Client Secret**

### 2. Get OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy and save the API key securely

### 3. Configure the API Server

```bash
cd api
cp .env.example .env
```

Edit the `.env` file with your credentials:
```env
# Strava API Configuration
STRAVA_CLIENT_ID=your_client_id_here
STRAVA_CLIENT_SECRET=your_client_secret_here
STRAVA_REDIRECT_URI=http://localhost:4200/auth/callback

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The API server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `GET /auth/url` - Get Strava authorization URL
- `POST /auth/token` - Exchange authorization code for access token
- `POST /auth/refresh` - Refresh access token

### Strava Data
- `GET /athlete` - Get athlete profile
- `GET /activities` - Get activities (paginated)
- `GET /activities/:id` - Get single activity details
- `GET /activities/:id/streams` - Get activity streams (HR, pace, etc.)

### AI Analysis
- `POST /ai/analyze-training` - Comprehensive training analysis
- `POST /ai/assess-goal` - Goal feasibility assessment
- `POST /ai/improvement-advice` - Personalized recommendations
- `POST /ai/analyze-race` - Detailed race performance analysis

## Security Best Practices

- API credentials are stored server-side only
- All Strava API calls are proxied through the backend
- OAuth tokens are securely exchanged on the server
- CORS is configured for local development only
- Never commit `.env` file with real credentials

## Troubleshooting

### "Failed to start server"
- Check that port 3000 is not already in use
- Verify all environment variables are set in `.env`
- Ensure Node.js 18+ is installed

### "Strava authentication failed"
- Verify Client ID and Secret are correct
- Check that redirect URI matches exactly: `http://localhost:4200/auth/callback`
- Ensure Authorization Callback Domain in Strava is set to `localhost`

### "AI analysis not working"
- Verify OpenAI API key is correct
- Check that you have credits in your OpenAI account
- Review server logs for detailed error messages

## Development

See [api/README.md](../api/README.md) for detailed API documentation and development instructions.

- Full Strava API V3 support
- Export routes (GPX, TCX)
- Fetch data streams (power, heart rate)
- Segment management
- Club and route support

**Setup**:
1. Configure `.env` file with your Strava API credentials
2. Build and run:
   ```bash
   npm run build
   npm start
   ```

## Configuration for This Angular App

The Angular application is designed to work with the Strava API through the MCP server. Update the `environment.ts` file to point to your MCP server:

```typescript
export const environment = {
  production: false,
  stravaApiUrl: 'http://localhost:8000', // Or your MCP server URL
  mcpEnabled: true
};
```

## Authentication Flow

1. User clicks "Connect with Strava" in the Angular app
2. App redirects to Strava OAuth page
3. User authorizes the application
4. Strava redirects back with authorization code
5. App exchanges code for access token via MCP server
6. Tokens are stored securely in localStorage
7. Subsequent API calls use the access token

## MCP Server Endpoints Used

The Angular app expects these endpoints from the MCP server:

- `GET /auth/url` - Get Strava OAuth authorization URL
- `POST /auth/token` - Exchange authorization code for access token
- `POST /auth/refresh` - Refresh expired access token
- `GET /athlete` - Get authenticated athlete profile
- `GET /activities` - Get athlete activities (paginated)
- `GET /activities/:id` - Get specific activity details
- `GET /athlete/stats` - Get athlete statistics

## Benefits of Using Existing MCP Server

1. **Maintenance**: Community maintains and updates the server
2. **Security**: Tested by many users, security issues are quickly patched
3. **Features**: Access to full Strava API capabilities
4. **Documentation**: Well-documented with examples
5. **Support**: Active community for help and issues
6. **Standards**: Follows MCP protocol standards

## Alternative: Direct Strava API Integration

If you prefer not to use an MCP server, you can modify the Angular services to call the Strava API directly. However, this approach requires:

1. Backend proxy to avoid exposing API secrets
2. Handling OAuth flow yourself
3. Token management and refresh logic
4. Rate limiting implementation
5. Error handling for all API calls

The MCP server handles all of this for you.

## Troubleshooting

### MCP Server Not Starting
- Check that environment variables are set correctly
- Verify Strava API credentials are valid
- Ensure the port is not already in use

### Authentication Failing
- Verify redirect URI matches exactly what's configured in Strava app settings
- Check that authorization callback domain is set to `localhost` (or your domain)
- Ensure access token hasn't expired

### No Activities Showing
- Verify the athlete has activities in their Strava account
- Check that API scopes include `activity:read_all`
- Look for errors in browser console

## Resources

- [Strava API Documentation](https://developers.strava.com/docs/reference/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Python Strava MCP](https://github.com/yorrickjansen/strava-mcp)
- [TypeScript Strava MCP](https://github.com/kw510/strava-mcp)
- [MCP Server Hub](https://mcpserverhub.net/)
