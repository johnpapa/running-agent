# Running Agent API

Backend API server for Running Agent application, providing Strava OAuth integration and AI-powered running analysis.

## Features

- **Strava OAuth Flow**: Complete authentication and token management
- **Strava API Proxy**: Secure access to athlete data, activities, and detailed metrics
- **AI Analysis**: Comprehensive training analysis using OpenAI GPT-4
  - Heart rate zone analysis and trends
  - Fueling pattern detection from activity notes
  - Pacing analysis (negative splits, bonking detection)
  - Weather impact assessment
  - Goal feasibility and personalized training plans
  - Performance optimization recommendations

## Prerequisites

- Node.js 18+ and npm
- Strava API credentials (Client ID and Secret)
- OpenAI API key

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` with your credentials:**
   ```
   STRAVA_CLIENT_ID=your_strava_client_id
   STRAVA_CLIENT_SECRET=your_strava_client_secret
   STRAVA_REDIRECT_URI=http://localhost:4200/auth/callback
   OPENAI_API_KEY=your_openai_api_key
   PORT=3000
   ```

4. **Get Strava API credentials:**
   - Go to https://www.strava.com/settings/api
   - Create an application
   - Set Authorization Callback Domain to `localhost`
   - Copy Client ID and Client Secret

5. **Get OpenAI API key:**
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key to your `.env` file

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `GET /auth/url` - Get Strava authorization URL
- `POST /auth/token` - Exchange authorization code for access token
- `POST /auth/refresh` - Refresh access token

### Strava Data
- `GET /athlete` - Get athlete profile
- `GET /activities` - Get athlete activities (paginated)
- `GET /activities/:id` - Get single activity details
- `GET /activities/:id/streams` - Get activity streams (HR, pace, etc.)

### AI Analysis
- `POST /ai/analyze-training` - Comprehensive training analysis
- `POST /ai/assess-goal` - Goal feasibility assessment
- `POST /ai/improvement-advice` - Personalized improvement recommendations
- `POST /ai/analyze-race` - Detailed race performance analysis

## AI Analysis Features

### Training Analysis
Analyzes recent activities for:
- Most/least effective workouts
- Heart rate zone distribution
- Fueling patterns from activity descriptions
- Pacing strategies (negative splits vs bonking)
- Actionable training improvements

### Goal Assessment
Evaluates goal feasibility considering:
- Current fitness level
- Training consistency
- Required improvement percentage
- Realistic timeframe
- Specific training plan steps

### Race Analysis
Deep dive into race performance:
- Pacing strategy evaluation
- Heart rate efficiency
- Fueling assessment
- Weather impact
- Training recommendations for next race

## Technologies

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **OpenAI GPT-4** - AI analysis
- **Axios** - HTTP client for Strava API
- **CORS** - Cross-origin support

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## Security Notes

- Never commit `.env` file with real credentials
- API keys are server-side only (not exposed to frontend)
- All Strava API calls are proxied through backend
- CORS is configured for local development

## License

MIT
