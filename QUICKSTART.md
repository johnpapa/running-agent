# Quick Start Guide

Get your Running Agent up and running in 5 minutes!

## Prerequisites

- Node.js 18+ and npm installed
- A Strava account
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

## Step 2: Configure the MCP Server (1 minute)

```bash
# Navigate to the MCP server directory
cd strava-mcp-server

# Copy the environment template
cp .env.example .env

# Edit the .env file with your credentials
nano .env  # or use your preferred editor
```

Update the `.env` file:
```env
STRAVA_CLIENT_ID=12345  # Your actual Client ID
STRAVA_CLIENT_SECRET=your_secret_here  # Your actual Client Secret
REDIRECT_URI=http://localhost:4200/auth/callback
PORT=3001
```

Save and close the file.

## Step 3: Install and Start the MCP Server (1 minute)

```bash
# Still in strava-mcp-server directory
npm install
npm run dev
```

You should see:
```
Strava MCP Server running on port 3001
Client ID configured: true
Client Secret configured: true
```

Keep this terminal window open!

## Step 4: Install and Start the Angular App (1 minute)

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

## Step 5: Use the Application!

1. Open your browser to [http://localhost:4200](http://localhost:4200)
2. Click "Connect with Strava"
3. Authorize the application on Strava
4. You'll be redirected back to the dashboard
5. Explore your activities and best times!

## Troubleshooting

### "Failed to get authorization URL"
- Make sure the MCP server is running on port 3001
- Check that your `.env` file has the correct credentials

### "Authentication Failed"
- Verify your Client ID and Secret are correct
- Ensure the redirect URI is exactly: `http://localhost:4200/auth/callback`
- Check that the Authorization Callback Domain in Strava is set to `localhost` (not a full URL)

### Port Already in Use
If port 4200 or 3001 is already in use:
- **Angular**: The CLI will automatically suggest the next available port
- **MCP Server**: Change the PORT in your `.env` file and update `environment.ts` accordingly

### No Activities Showing
- Make sure you have activities in your Strava account
- Try going for a run and uploading it to Strava!
- Check the browser console (F12) for any error messages

## Next Steps

- Explore the Activities tab to search your runs
- Check out Best Times to see your personal records
- Go for a run and watch your stats update!

## Need Help?

Check the full [README.md](README.md) for more detailed information and troubleshooting tips.

Happy Running! 🏃‍♂️💨
