import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Strava OAuth configuration
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || '';
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || '';
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:4200/auth/callback';

// Strava API endpoints
const STRAVA_AUTH_URL = 'https://www.strava.com/oauth/authorize';
const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';
const STRAVA_API_URL = 'https://www.strava.com/api/v3';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Strava MCP Server is running' });
});

// Get Strava authorization URL
app.get('/auth/url', (req, res) => {
  const authUrl = `${STRAVA_AUTH_URL}?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=activity:read_all,profile:read_all`;
  res.json({ authUrl });
});

// Exchange authorization code for access token
app.post('/auth/token', async (req, res) => {
  const { code } = req.body;
  
  try {
    const response = await axios.post(STRAVA_TOKEN_URL, {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code'
    });
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Error exchanging token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to exchange authorization code' });
  }
});

// Refresh access token
app.post('/auth/refresh', async (req, res) => {
  const { refresh_token } = req.body;
  
  try {
    const response = await axios.post(STRAVA_TOKEN_URL, {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token,
      grant_type: 'refresh_token'
    });
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Error refreshing token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

// Get athlete profile
app.get('/athlete', async (req, res) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  
  if (!accessToken) {
    return res.status(401).json({ error: 'No access token provided' });
  }
  
  try {
    const response = await axios.get(`${STRAVA_API_URL}/athlete`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Error fetching athlete:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch athlete profile' });
  }
});

// Get athlete activities
app.get('/activities', async (req, res) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  
  if (!accessToken) {
    return res.status(401).json({ error: 'No access token provided' });
  }
  
  const { page = 1, per_page = 30, after, before } = req.query;
  
  try {
    const response = await axios.get(`${STRAVA_API_URL}/athlete/activities`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { page, per_page, after, before }
    });
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Error fetching activities:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get specific activity
app.get('/activities/:id', async (req, res) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  
  if (!accessToken) {
    return res.status(401).json({ error: 'No access token provided' });
  }
  
  const { id } = req.params;
  
  try {
    const response = await axios.get(`${STRAVA_API_URL}/activities/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Error fetching activity:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Get athlete stats
app.get('/athlete/stats', async (req, res) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  
  if (!accessToken) {
    return res.status(401).json({ error: 'No access token provided' });
  }
  
  try {
    // First get athlete ID
    const athleteResponse = await axios.get(`${STRAVA_API_URL}/athlete`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    const athleteId = athleteResponse.data.id;
    
    // Then get stats
    const statsResponse = await axios.get(`${STRAVA_API_URL}/athletes/${athleteId}/stats`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    res.json(statsResponse.data);
  } catch (error: any) {
    console.error('Error fetching stats:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch athlete stats' });
  }
});

app.listen(PORT, () => {
  console.log(`Strava MCP Server running on port ${PORT}`);
  console.log(`Client ID configured: ${!!STRAVA_CLIENT_ID}`);
  console.log(`Client Secret configured: ${!!STRAVA_CLIENT_SECRET}`);
});
