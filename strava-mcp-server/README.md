# Strava MCP Server

A Model Context Protocol (MCP) server for Strava API integration.

## Setup

1. Register your application with Strava:
   - Go to https://www.strava.com/settings/api
   - Create a new application
   - Set the Authorization Callback Domain to `localhost`

2. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build and start the server:
   ```bash
   npm run dev
   ```

The server will run on port 3001 by default.

## Endpoints

- `GET /health` - Health check
- `GET /auth/url` - Get Strava OAuth authorization URL
- `POST /auth/token` - Exchange authorization code for access token
- `POST /auth/refresh` - Refresh access token
- `GET /athlete` - Get authenticated athlete profile
- `GET /activities` - Get athlete activities
- `GET /activities/:id` - Get specific activity details
- `GET /athlete/stats` - Get athlete statistics

## Usage with Angular App

The Angular application in the `angular-app` folder is configured to use this MCP server for Strava integration.
