# Running Agent - AI-Powered Training Analysis

An Angular application that helps runners analyze their training, track personal records, and get AI-powered insights to improve performance. Integrates with Strava for activity data and uses OpenAI GPT-4 for intelligent training analysis.

## ✨ Key Features

### 🏃 Activity Tracking
- View and search all your running activities from Strava
- Real-time search and filtering
- Detailed metrics: distance, time, pace, elevation
- Activity history with full details

### 🏆 Personal Records
- Automatic calculation of best times for standard distances:
  - 1 Mile, 5K, 10K, 15K, Half Marathon, Marathon
- Track progress over time
- See which activities set your PRs

### 🤖 AI-Powered Training Analysis
- **Training Effectiveness**: AI identifies your most and least effective workouts
- **Heart Rate Analysis**: Zone distribution, trends, and efficiency recommendations
- **Fueling Insights**: Pattern detection from activity notes and descriptions
- **Pacing Analysis**: Negative splits, bonking detection, and consistency evaluation
- **Goal Assessment**: Realistic goal predictions with detailed training plans
- **Improvement Suggestions**: Personalized recommendations on how to get faster
- **Race Analysis**: Deep insights on race performance including weather impact
- **Expected Improvements**: AI predicts realistic timeline for achieving goals

### 🔐 Secure Authentication
- OAuth 2.0 integration with Strava
- Secure token management via backend API
- No API secrets exposed to frontend

## 🏗️ Architecture

### Frontend
- **Angular 21** with standalone components
- TypeScript with strict mode
- SCSS for modern styling
- RxJS for reactive state management

### Backend
- **Express.js + TypeScript API**
  - Strava OAuth flow handling
  - Secure API proxy for Strava data
  - OpenAI GPT-4 integration for AI analysis
  - Comprehensive training analysis endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Strava account with API credentials
- OpenAI API key

### 1. Get Strava API Credentials
1. Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
2. Create an application
3. Note your Client ID and Client Secret
4. Set Authorization Callback Domain to `localhost`

### 2. Get OpenAI API Key
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Save it securely

### 3. Set Up the Backend API
```bash
cd api
cp .env.example .env
# Edit .env with your credentials
npm install
npm run dev
```

The API server will run on http://localhost:3000

### 4. Run the Angular Application
```bash
cd angular-app
npm install
npm start
```

The app will be available at http://localhost:4200

### 5. Start Using the App
1. Open http://localhost:4200
2. Click "Connect with Strava"
3. Authorize the application
4. Explore your activities, PRs, and AI-powered insights!

## 📊 AI Analysis Features

### Comprehensive Training Analysis
The AI analyzes your recent activities to provide:
- Most and least effective workouts with detailed reasoning
- Heart rate zone distribution and efficiency trends
- Fueling patterns extracted from activity descriptions
- Pacing analysis (negative splits vs bonking)
- Specific actionable training improvements

### Goal Assessment
Ask questions like:
- "Can I improve my marathon time from 3:24 to 3:15?"
- "Is a sub-3-hour marathon realistic for me?"

The AI will assess:
- Goal feasibility with confidence percentage
- Realistic timeframe needed
- Specific weekly mileage targets
- Key workouts to incorporate
- Step-by-step training plan

### Race Performance Analysis
Deep dive into race performance:
- Pacing strategy evaluation (negative split, even pace, or bonked)
- Heart rate efficiency assessment
- Fueling effectiveness from race notes
- Weather impact considerations
- Training recommendations for next race

## 🛠️ Technologies

### Frontend
- **Angular 21** - Latest version with modern features
- **TypeScript 5.9** - Type-safe development
- **RxJS 7.8** - Reactive programming
- **SCSS** - Modern styling

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend
- **OpenAI GPT-4** - AI-powered analysis
- **Axios** - HTTP client for Strava API
- **Strava API** - Activity and athlete data

## 📖 Documentation

- [QUICKSTART.md](QUICKSTART.md) - 5-minute setup guide
- [api/README.md](api/README.md) - Backend API documentation
- [FEATURES.md](FEATURES.md) - Complete feature list
- [TESTING.md](TESTING.md) - Testing checklist
- [SECURITY_UPDATE.md](SECURITY_UPDATE.md) - Security information

## 🔒 Security

- OAuth 2.0 for authentication
- Backend API proxy prevents API key exposure
- Secure token storage
- No API secrets in client code
- Regular security updates
- Angular 21 includes all latest security patches

## 🧪 Development

### Build the Application
```bash
# Backend
cd api
npm run build

# Frontend
cd angular-app
npm run build
```

### Run Tests
```bash
cd angular-app
npm test
```

### Development Mode
```bash
# Terminal 1: API Server
cd api
npm run dev

# Terminal 2: Angular App
cd angular-app
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Strava API for activity data
- OpenAI for GPT-4 AI capabilities
- Angular team for excellent framework

## ❓ Frequently Asked Questions

### How does the AI analysis work?
The application uses OpenAI's GPT-4 to analyze your training data and provide intelligent insights. The AI considers:
- Your recent activity patterns and metrics
- Heart rate zones and trends
- Pace consistency and progression
- Training volume and intensity
- Fueling patterns from activity notes
- Pacing strategies (negative splits, bonking)
- Recovery indicators
- Goal-specific requirements

### Can I use this without Strava?
Currently, the app is designed specifically for Strava data. However, the architecture could be adapted to work with other fitness platforms.

### Is my data private?
Yes! All authentication uses OAuth 2.0, and your data is only accessed with your explicit permission. The backend API proxies all requests, keeping your credentials secure. Tokens are stored locally in your browser, and the app never stores your Strava password or API keys in the frontend.

### What does the AI analysis cost?
The application uses OpenAI's GPT-4 API, which has associated costs based on usage. You'll need your own OpenAI API key. Typical analysis requests cost a few cents each. Check OpenAI's pricing page for current rates.

## 📧 Support

For issues and questions:
1. Check the documentation in this repository
2. Review the [Strava API documentation](https://developers.strava.com/)
3. Open an issue on GitHub
