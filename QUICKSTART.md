# Quick Start Guide

Get your Running Agent up and running in 5 minutes!

## Prerequisites

- Node.js 18+ and npm installed
- A Strava account
- OpenAI API key (for AI analysis features)
- 5 minutes of setup time

## Step 1: Get Strava API Credentials (2 minutes)

1. Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
2. Click "Create an App" or use an existing app
3. Fill in the required fields:
   - **Application Name**: Running Agent (or your preferred name)
   - **Category**: Training
   - **Club**: Leave blank
   - **Website**: http://localhost:4200
   - **Authorization Callback Domain**: `localhost`
4. Click "Create"
5. Note your **Client ID** and **Client Secret** from the API settings page

## Step 2: Get OpenAI API Key (1 minute)

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (you won't be able to see it again!)

## Step 3: Configure the API Server (1 minute)

```bash
# Navigate to the API directory
cd api

# Copy the environment template
cp .env.example .env

# Edit the .env file with your credentials
nano .env  # or use your preferred editor
```

Update the `.env` file:
```env
STRAVA_CLIENT_ID=12345  # Your actual Client ID
STRAVA_CLIENT_SECRET=your_secret_here  # Your actual Client Secret
STRAVA_REDIRECT_URI=http://localhost:4200/auth/callback
OPENAI_API_KEY=sk-your_key_here  # Your OpenAI API key
PORT=3000
```

Save and close the file.

## Step 4: Install and Start the API Server (1 minute)

```bash
# Still in api directory
npm install
npm run dev
```

You should see:
```
Running Agent API server running on port 3000
Environment: development
```

Keep this terminal window open!

## Step 5: Install and Start the Angular App (1 minute)

Open a NEW terminal window:

```bash
# Navigate to the Angular app directory
cd angular-app

# Install dependencies
npm install

# Start the development server
npm start
```

Wait for the message:
```
✔ Browser application bundle generation complete.
✔ Compiled successfully.
```

## Step 6: Use the Application!

1. Open your browser to [http://localhost:4200](http://localhost:4200)
2. Click "Connect with Strava"
3. Authorize the application on Strava
4. You'll be redirected back to the dashboard
5. Explore your activities, best times, and AI-powered insights!

## Troubleshooting

### "Failed to get authorization URL"
- Make sure the API server is running on port 3000
- Check that your `.env` file has the correct credentials

### "Authentication Failed"
- Verify your Client ID and Secret are correct
- Ensure the redirect URI is exactly: `http://localhost:4200/auth/callback`
- Check that the Authorization Callback Domain in Strava is set to `localhost` (not a full URL)

### AI Analysis Not Working
- Verify your OpenAI API key is correct in the `.env` file
- Check that you have credits available in your OpenAI account
- Review API server logs for error messages

### Port Already in Use
If port 4200 or 3000 is already in use:
- **Angular**: The CLI will automatically suggest the next available port
- **API Server**: Change the PORT in your `.env` file and update `environment.ts` accordingly

### No Activities Showing
- Make sure you have activities in your Strava account
- Try going for a run and uploading it to Strava!
- Check the browser console (F12) for any error messages

## Next Steps

- Explore the Activities tab to search your runs
- Check out Best Times to see your personal records
- Try the AI Analysis features for personalized training insights
- Go for a run and watch your stats update!

## Need Help?

Check the full [README.md](README.md) for more detailed information and troubleshooting tips.

Happy Running! 🏃‍♂️💨

