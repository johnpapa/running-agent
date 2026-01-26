# Strava MCP Server Integration

This application integrates with an existing Strava MCP (Model Context Protocol) server instead of implementing a custom one. This approach leverages battle-tested, community-maintained infrastructure.

## Recommended Strava MCP Server

We recommend using one of these existing implementations:

### Option 1: Python Implementation (Recommended)
**Repository**: [yorrickjansen/strava-mcp](https://github.com/yorrickjansen/strava-mcp)

**Installation**:
```bash
# Install via uvx (recommended)
uvx strava-mcp

# Or install via pip
pip install strava-mcp
```

**Features**:
- Get activities, activity details, segments, and leaderboards
- OAuth authentication
- Easy integration with Claude Desktop and other MCP clients
- Well-documented and actively maintained

**Setup**:
1. Get Strava API credentials from https://www.strava.com/settings/api
2. Set environment variables:
   ```bash
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   export STRAVA_REFRESH_TOKEN=your_refresh_token
   ```
3. Run the server:
   ```bash
   uvx strava-mcp
   ```

### Option 2: TypeScript Implementation
**Repository**: [kw510/strava-mcp](https://github.com/kw510/strava-mcp)

**Installation**:
```bash
git clone https://github.com/kw510/strava-mcp
cd strava-mcp
npm install
```

**Features**:
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
