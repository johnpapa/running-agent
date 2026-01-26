# Running Agent - AI-Powered Training Analysis

An Angular application that helps runners analyze their training, track personal records, and get AI-powered insights to improve performance. Integrates with Strava for activity data and uses GitHub Copilot SDK for intelligent training analysis.

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

### 🤖 AI-Powered Training Analysis (NEW!)
- **Training Effectiveness**: AI identifies your most and least effective workouts
- **Goal Assessment**: Get realistic goal predictions (e.g., "Can I improve my marathon from 3:24 to 3:15?")
- **Improvement Suggestions**: Personalized recommendations on how to get faster
- **Race Analysis**: Insights on recent races and training plans
- **Expected Improvements**: AI predicts realistic timeline for achieving goals

### 🔐 Secure Authentication
- OAuth 2.0 integration with Strava
- Secure token management
- Support for social login (Google, etc.) via Strava

## 🏗️ Architecture

### Frontend
- **Angular 21** (latest version) with standalone components
- TypeScript with strict mode
- SCSS for modern styling
- RxJS for reactive state management
- GitHub Copilot SDK for AI analysis

### Backend/Integration
- **Strava MCP Server** (external, community-maintained)
  - See [STRAVA_MCP_SETUP.md](STRAVA_MCP_SETUP.md) for setup instructions
  - We recommend [yorrickjansen/strava-mcp](https://github.com/yorrickjansen/strava-mcp)

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm
- Strava account with API credentials
- Strava MCP Server running (see STRAVA_MCP_SETUP.md)

### 1. Get Strava API Credentials
1. Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
2. Create an application
3. Note your Client ID and Client Secret
4. Set Authorization Callback Domain to `localhost`

### 2. Set Up Strava MCP Server
Follow the detailed instructions in [STRAVA_MCP_SETUP.md](STRAVA_MCP_SETUP.md).

Quick option using Python:
```bash
# Install Strava MCP server
uvx strava-mcp

# Or with pip
pip install strava-mcp

# Configure environment variables
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
export STRAVA_REFRESH_TOKEN=your_refresh_token

# Run the server
uvx strava-mcp
```

### 3. Run the Angular Application
```bash
cd angular-app
npm install
npm start
```

The app will be available at http://localhost:4200

### 4. Start Using the App
1. Open http://localhost:4200
2. Click "Connect with Strava"
3. Authorize the application
4. Explore your activities, PRs, and AI-powered insights!

## 📊 AI Analysis Features

### Training Effectiveness
The AI analyzes your recent activities to determine:
- Which workouts were most effective for your goals
- Which workouts were less beneficial
- Why each workout was effective or ineffective
- Specific metrics like pace consistency and effort level

### Goal Assessment
Ask questions like:
- "Can I improve my marathon time from 3:24 to 3:15?"
- "Is a sub-3-hour marathon realistic for me?"

The AI will assess:
- Whether the goal is realistic (confidence %)
- Estimated timeframe needed
- Specific training steps to achieve it
- Reasoning based on your current training

### Improvement Recommendations
Get personalized advice on:
- Specific workouts to add to your training
- Optimal training volume and intensity
- Recovery strategies
- Race-specific preparation

## 🛠️ Technologies

- **Angular 21** - Latest version with modern features
- **TypeScript 5.9** - Type-safe development
- **GitHub Copilot SDK** - AI-powered analysis
- **RxJS 7.8** - Reactive programming
- **SCSS** - Modern styling
- **Strava API** - Activity data via MCP server

## 📖 Documentation

- [QUICKSTART.md](QUICKSTART.md) - 5-minute setup guide
- [STRAVA_MCP_SETUP.md](STRAVA_MCP_SETUP.md) - MCP server configuration
- [FEATURES.md](FEATURES.md) - Complete feature list
- [TESTING.md](TESTING.md) - Testing checklist
- [SECURITY_UPDATE.md](SECURITY_UPDATE.md) - Security information

## 🔒 Security

- OAuth 2.0 for authentication
- Secure token storage
- No API secrets in client code
- Regular security updates
- Angular 21 includes all latest security patches

## 🧪 Development

### Build the Application
```bash
cd angular-app
npm run build
```

### Run Tests
```bash
npm test
```

### Development Mode
```bash
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Strava API for activity data
- Community-maintained Strava MCP servers
- GitHub Copilot SDK for AI capabilities
- Angular team for excellent framework

## ❓ Frequently Asked Questions

### Why use an MCP server instead of direct API calls?
The MCP (Model Context Protocol) server provides a standardized, maintained interface to the Strava API. Benefits include:
- Community maintenance and updates
- Built-in OAuth handling
- Rate limiting and error handling
- Security best practices
- Full API feature support

### How does the AI analysis work?
The application uses the GitHub Copilot SDK to analyze your training data and provide intelligent insights. The AI considers:
- Your recent activity patterns
- Pace consistency and progression
- Training volume and intensity
- Recovery indicators
- Goal-specific requirements

### Can I use this without Strava?
Currently, the app is designed specifically for Strava data. However, the architecture could be adapted to work with other fitness platforms.

### Is my data private?
Yes! All authentication uses OAuth 2.0, and your data is only accessed with your explicit permission. Tokens are stored locally in your browser, and the app never stores your Strava password.

## 📧 Support

For issues and questions:
1. Check the documentation in this repository
2. Review the [Strava API documentation](https://developers.strava.com/)
3. Open an issue on GitHub
