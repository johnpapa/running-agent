import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Strava API base URL
const STRAVA_API_BASE = 'https://www.strava.com/api/v3';
const STRAVA_AUTH_BASE = 'https://www.strava.com/oauth';

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get Strava authorization URL
app.get('/auth/url', (req: Request, res: Response) => {
  const authUrl = `${STRAVA_AUTH_BASE}/authorize?` +
    `client_id=${process.env.STRAVA_CLIENT_ID}&` +
    `redirect_uri=${process.env.STRAVA_REDIRECT_URI}&` +
    `response_type=code&` +
    `scope=activity:read_all,profile:read_all`;
  
  res.json({ authUrl });
});

// Exchange authorization code for token
app.post('/auth/token', async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    
    const response = await axios.post(`${STRAVA_AUTH_BASE}/token`, {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    });
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Token exchange error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to exchange token' });
  }
});

// Refresh access token
app.post('/auth/refresh', async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;
    
    const response = await axios.post(`${STRAVA_AUTH_BASE}/token`, {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token,
      grant_type: 'refresh_token',
    });
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Token refresh error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

// Get athlete profile
app.get('/athlete', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    const response = await axios.get(`${STRAVA_API_BASE}/athlete`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Get athlete error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get athlete data' });
  }
});

// Get activities
app.get('/activities', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { page = 1, per_page = 30 } = req.query;
    
    const response = await axios.get(`${STRAVA_API_BASE}/athlete/activities`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, per_page },
    });
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Get activities error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get activities' });
  }
});

// Get single activity with detailed data
app.get('/activities/:id', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { id } = req.params;
    
    const response = await axios.get(`${STRAVA_API_BASE}/activities/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Get activity error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get activity' });
  }
});

// Get activity streams (HR, pace, cadence, etc.)
app.get('/activities/:id/streams', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { id } = req.params;
    const keys = 'time,heartrate,cadence,watts,altitude,velocity_smooth';
    
    const response = await axios.get(
      `${STRAVA_API_BASE}/activities/${id}/streams`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { keys, key_by_type: true },
      }
    );
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Get streams error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get activity streams' });
  }
});

// AI Analysis endpoint - Comprehensive training analysis
app.post('/ai/analyze-training', async (req: Request, res: Response) => {
  try {
    const { activities } = req.body;
    
    if (!activities || activities.length === 0) {
      return res.status(400).json({ error: 'No activities provided' });
    }

    const activitySummary = activities.slice(0, 30).map((a: any, i: number) => {
      const distance = (a.distance / 1000).toFixed(2);
      const pace = calculatePace(a.distance, a.moving_time);
      const hr = a.average_heartrate ? `${a.average_heartrate}bpm` : 'N/A';
      const maxHr = a.max_heartrate ? `${a.max_heartrate}bpm` : 'N/A';
      
      return `Run ${i + 1}: ${a.name}
  Date: ${new Date(a.start_date).toLocaleDateString()}
  Distance: ${distance}km
  Time: ${formatTime(a.moving_time)}
  Pace: ${pace}
  Elevation Gain: ${a.total_elevation_gain}m
  Avg HR: ${hr} | Max HR: ${maxHr}
  Description: ${a.description || 'None'}`;
    }).join('\n\n');

    const prompt = `You are an elite running coach with expertise in training analysis, exercise physiology, and performance optimization. Analyze these recent training runs in detail.

Recent activities:
${activitySummary}

Provide a comprehensive analysis in JSON format with this exact structure:
{
  "mostEffective": [
    {"index": number, "effectiveness": number (0-100), "reason": string}
  ],
  "leastEffective": [
    {"index": number, "effectiveness": number (0-100), "reason": string}
  ],
  "suggestions": [string],
  "summary": string,
  "heartRateAnalysis": {
    "zones": {
      "easy": number (percentage of runs),
      "moderate": number,
      "hard": number,
      "veryHard": number
    },
    "trends": string,
    "recommendations": string
  },
  "fuelingAnalysis": {
    "patterns": string,
    "recommendations": [string]
  },
  "pacingAnalysis": {
    "negativeSplits": number (count),
    "bonkingSessions": number (count),
    "consistency": string,
    "recommendations": [string]
  }
}

Analyze:
1. Most effective 3 workouts (considering progression, HR zones, pacing)
2. Least effective 3 workouts
3. Heart rate zone distribution and trends
4. Fueling patterns from activity descriptions
5. Pacing strategies (negative splits vs bonking)
6. Specific actionable improvements`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');
    res.json(analysis);
  } catch (error: any) {
    console.error('AI analysis error:', error.message);
    res.status(500).json({ error: 'Failed to analyze training' });
  }
});

// AI Analysis - Goal assessment
app.post('/ai/assess-goal', async (req: Request, res: Response) => {
  try {
    const { currentTime, targetTime, distance, recentActivities } = req.body;
    
    const improvement = ((currentTime - targetTime) / currentTime * 100).toFixed(1);
    const recentPaces = recentActivities.slice(0, 10).map((a: any) => 
      calculatePace(a.distance, a.moving_time)
    );

    const prompt = `You are an expert running coach assessing goal feasibility.

Goal: Improve ${distance} time from ${formatTime(currentTime)} to ${formatTime(targetTime)}
That's a ${improvement}% improvement.

Recent training paces: ${recentPaces.join(', ')}

Recent training data:
${recentActivities.slice(0, 10).map((a: any) => 
  `${a.name}: ${(a.distance / 1000).toFixed(2)}km in ${formatTime(a.moving_time)}, HR: ${a.average_heartrate || 'N/A'}`
).join('\n')}

Assess if this goal is realistic and provide a detailed plan in JSON format:
{
  "realistic": boolean,
  "confidence": number (0-100),
  "timeFrame": string,
  "reasoning": string,
  "steps": [string],
  "weeklyMileageTarget": string,
  "keyWorkouts": [string]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const assessment = JSON.parse(completion.choices[0].message.content || '{}');
    res.json(assessment);
  } catch (error: any) {
    console.error('Goal assessment error:', error.message);
    res.status(500).json({ error: 'Failed to assess goal' });
  }
});

// AI Analysis - Improvement advice
app.post('/ai/improvement-advice', async (req: Request, res: Response) => {
  try {
    const { activities } = req.body;
    
    const totalDistance = activities.reduce((sum: number, a: any) => sum + a.distance, 0);
    const avgPace = calculatePace(
      totalDistance,
      activities.reduce((sum: number, a: any) => sum + a.moving_time, 0)
    );
    
    const avgHR = activities
      .filter((a: any) => a.average_heartrate)
      .reduce((sum: number, a: any) => sum + a.average_heartrate, 0) / 
      activities.filter((a: any) => a.average_heartrate).length;

    const prompt = `You are an expert running coach. Based on this training data, provide 5-7 specific, actionable recommendations to improve running performance.

Training summary:
- Total volume: ${(totalDistance / 1000).toFixed(1)}km over ${activities.length} runs
- Average pace: ${avgPace}
- Average HR: ${avgHR ? avgHR.toFixed(0) + 'bpm' : 'N/A'}
- Recent runs: ${activities.slice(0, 5).map((a: any) => 
    `${a.name} (${(a.distance/1000).toFixed(1)}km, ${calculatePace(a.distance, a.moving_time)})`
  ).join('; ')}

Provide recommendations as JSON array:
{
  "recommendations": [
    {
      "category": string ("speed", "endurance", "recovery", "strength", "technique"),
      "priority": string ("high", "medium", "low"),
      "advice": string,
      "implementation": string
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    res.json(result);
  } catch (error: any) {
    console.error('Improvement advice error:', error.message);
    res.status(500).json({ error: 'Failed to generate advice' });
  }
});

// AI Analysis - Race analysis with weather and deep insights
app.post('/ai/analyze-race', async (req: Request, res: Response) => {
  try {
    const { race, trainingActivities, streams } = req.body;
    
    let hrAnalysis = '';
    if (streams?.heartrate) {
      const hrData = streams.heartrate.data;
      const maxHR = Math.max(...hrData);
      const avgHR = hrData.reduce((a: number, b: number) => a + b, 0) / hrData.length;
      hrAnalysis = `HR: Avg ${avgHR.toFixed(0)}bpm, Max ${maxHR}bpm`;
    }

    const prompt = `You are an elite running coach analyzing a race performance with deep physiological insights.

Race: ${race.name}
Date: ${new Date(race.start_date).toLocaleDateString()}
Distance: ${(race.distance / 1000).toFixed(2)}km
Time: ${formatTime(race.moving_time)}
Pace: ${calculatePace(race.distance, race.moving_time)}
Elevation: ${race.total_elevation_gain}m
${hrAnalysis}
Description/Notes: ${race.description || 'None'}

Training context (last 30 days):
${trainingActivities.slice(0, 10).map((a: any) => 
  `${a.name}: ${(a.distance/1000).toFixed(1)}km, ${calculatePace(a.distance, a.moving_time)}, HR: ${a.average_heartrate || 'N/A'}`
).join('\n')}

Provide comprehensive race analysis in JSON:
{
  "performance": {
    "rating": string,
    "strengths": [string],
    "weaknesses": [string]
  },
  "pacing": {
    "strategy": string ("negative split", "even pace", "positive split/bonked"),
    "analysis": string,
    "recommendation": string
  },
  "heartRate": {
    "zones": string,
    "efficiency": string,
    "improvements": [string]
  },
  "fueling": {
    "assessment": string,
    "recommendations": [string]
  },
  "weather": {
    "impact": string,
    "considerations": string
  },
  "trainingRecommendations": [string],
  "nextSteps": [string]
}

Analyze pacing (did they negative split or bonk?), HR efficiency, fueling from notes, weather impact, and provide actionable next steps.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');
    res.json(analysis);
  } catch (error: any) {
    console.error('Race analysis error:', error.message);
    res.status(500).json({ error: 'Failed to analyze race' });
  }
});

// Helper functions
function calculatePace(distanceMeters: number, timeSeconds: number): string {
  const distanceKm = distanceMeters / 1000;
  const timeMinutes = timeSeconds / 60;
  const paceMinPerKm = timeMinutes / distanceKm;
  
  const minutes = Math.floor(paceMinPerKm);
  const seconds = Math.round((paceMinPerKm - minutes) * 60);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}/km`;
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

app.listen(PORT, () => {
  console.log(`Running Agent API server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
