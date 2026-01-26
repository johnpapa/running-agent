import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity } from '../models/strava.models';

export interface TrainingAnalysis {
  mostEffectiveWorkouts: AnalyzedWorkout[];
  leastEffectiveWorkouts: AnalyzedWorkout[];
  improvementSuggestions: string[];
  goalAssessment: GoalAssessment;
  summary: string;
}

export interface AnalyzedWorkout {
  activity: Activity;
  effectiveness: number; // 0-100 score
  reason: string;
  metrics: {
    paceConsistency: number;
    effortLevel: number;
    recoveryIndicator: number;
  };
}

export interface GoalAssessment {
  currentPace: string;
  targetPace: string;
  timeFrame: string;
  realistic: boolean;
  confidence: number; // 0-100
  reasoning: string;
  recommendedSteps: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AiAnalysisService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; // Can be configured to use Copilot or other AI

  constructor(private http: HttpClient) {}

  /**
   * Analyzes training activities to determine most and least effective workouts
   */
  analyzeTrainingEffectiveness(activities: Activity[]): Observable<TrainingAnalysis> {
    const prompt = this.buildTrainingAnalysisPrompt(activities);
    
    return this.callAI(prompt).pipe(
      map(response => this.parseTrainingAnalysis(response, activities))
    );
  }

  /**
   * Assesses if a specific goal is realistic (e.g., improving marathon from 3:24 to 3:15)
   */
  assessGoal(
    currentTime: number, 
    targetTime: number, 
    distance: string, 
    recentActivities: Activity[]
  ): Observable<GoalAssessment> {
    const prompt = this.buildGoalAssessmentPrompt(currentTime, targetTime, distance, recentActivities);
    
    return this.callAI(prompt).pipe(
      map(response => this.parseGoalAssessment(response, currentTime, targetTime))
    );
  }

  /**
   * Provides personalized advice on how to get faster
   */
  getImprovementAdvice(activities: Activity[]): Observable<string[]> {
    const prompt = this.buildImprovementPrompt(activities);
    
    return this.callAI(prompt).pipe(
      map(response => this.parseImprovementAdvice(response))
    );
  }

  /**
   * Analyzes recent races and training plan
   */
  analyzeRecentRaces(races: Activity[], trainingActivities: Activity[]): Observable<string> {
    const prompt = this.buildRaceAnalysisPrompt(races, trainingActivities);
    
    return this.callAI(prompt).pipe(
      map(response => response)
    );
  }

  private buildTrainingAnalysisPrompt(activities: Activity[]): string {
    const activitySummary = activities.slice(0, 20).map((a, i) => `
      Run ${i + 1}: ${a.name}
      - Date: ${new Date(a.start_date).toLocaleDateString()}
      - Distance: ${(a.distance / 1000).toFixed(2)}km
      - Time: ${this.formatTime(a.moving_time)}
      - Pace: ${this.calculatePace(a.distance, a.moving_time)}
      - Elevation: ${a.total_elevation_gain}m
      ${a.average_heartrate ? `- Avg HR: ${a.average_heartrate}bpm` : ''}
    `).join('\n');

    return `You are an expert running coach analyzing training effectiveness. 
    Analyze these recent training runs and identify:
    1. The 3 most effective workouts (considering pace, consistency, and progression)
    2. The 3 least effective workouts
    3. Key improvement suggestions
    
    Recent activities:
    ${activitySummary}
    
    Provide analysis in JSON format:
    {
      "mostEffective": [{"index": number, "effectiveness": number, "reason": string}],
      "leastEffective": [{"index": number, "effectiveness": number, "reason": string}],
      "suggestions": [string],
      "summary": string
    }`;
  }

  private buildGoalAssessmentPrompt(
    currentTime: number, 
    targetTime: number, 
    distance: string, 
    activities: Activity[]
  ): string {
    const improvement = ((currentTime - targetTime) / currentTime * 100).toFixed(1);
    const recentPaces = activities.slice(0, 10).map(a => this.calculatePace(a.distance, a.moving_time));

    return `You are an expert running coach assessing marathon goal feasibility.
    
    Goal: Improve ${distance} time from ${this.formatTime(currentTime)} to ${this.formatTime(targetTime)}
    That's a ${improvement}% improvement.
    
    Recent training paces: ${recentPaces.join(', ')}
    
    Assess if this goal is realistic and provide:
    1. Confidence level (0-100)
    2. Timeframe needed
    3. Specific steps to achieve it
    
    Format response as JSON:
    {
      "realistic": boolean,
      "confidence": number,
      "timeFrame": string,
      "reasoning": string,
      "steps": [string]
    }`;
  }

  private buildImprovementPrompt(activities: Activity[]): string {
    const totalDistance = activities.reduce((sum, a) => sum + a.distance, 0);
    const avgPace = activities.length > 0 
      ? this.calculatePace(totalDistance, activities.reduce((sum, a) => sum + a.moving_time, 0))
      : 'N/A';

    return `You are an expert running coach. Based on this training data, provide 5 specific, actionable recommendations to get faster:
    
    Total training volume: ${(totalDistance / 1000).toFixed(1)}km over ${activities.length} runs
    Average pace: ${avgPace}
    
    Provide recommendations as a JSON array of strings: ["recommendation 1", "recommendation 2", ...]`;
  }

  private buildRaceAnalysisPrompt(races: Activity[], training: Activity[]): string {
    const raceInfo = races.map(r => `
      ${r.name}: ${(r.distance / 1000).toFixed(2)}km in ${this.formatTime(r.moving_time)}
      Pace: ${this.calculatePace(r.distance, r.moving_time)}
    `).join('\n');

    return `Analyze these race performances and training:
    
    Recent Races:
    ${raceInfo}
    
    Training volume: ${training.length} runs, ${(training.reduce((s, a) => s + a.distance, 0) / 1000).toFixed(1)}km total
    
    Provide insights on performance trends and training effectiveness.`;
  }

  private callAI(prompt: string): Observable<string> {
    // Note: This is a simplified implementation
    // In production, you would:
    // 1. Use environment variables for API keys
    // 2. Implement proper error handling
    // 3. Use a backend proxy to avoid exposing API keys
    // 4. Consider using GitHub Copilot SDK or Azure OpenAI
    
    // For now, return a mock response for demonstration
    return from(Promise.resolve(this.getMockResponse(prompt)));
  }

  private getMockResponse(prompt: string): string {
    // Mock AI response for demonstration
    // In production, this would call the actual AI API
    if (prompt.includes('most effective')) {
      return JSON.stringify({
        mostEffective: [
          {index: 0, effectiveness: 92, reason: "Progressive long run with negative splits shows excellent endurance building"},
          {index: 1, effectiveness: 88, reason: "Tempo run at target pace demonstrates race-specific fitness"},
          {index: 2, effectiveness: 85, reason: "Recovery run at proper easy pace supports adaptation"}
        ],
        leastEffective: [
          {index: 5, effectiveness: 45, reason: "Too fast for easy run, preventing proper recovery"},
          {index: 8, effectiveness: 40, reason: "Inconsistent pacing throughout, lacks specific purpose"},
          {index: 12, effectiveness: 35, reason: "Inadequate warmup before hard effort increases injury risk"}
        ],
        suggestions: [
          "Incorporate 1-2 interval sessions per week to improve VO2max",
          "Extend long run to 25-30km for marathon preparation",
          "Add strength training 2x per week to prevent injury",
          "Practice race-pace runs to build mental and physical adaptation",
          "Ensure 24-48 hours recovery between hard sessions"
        ],
        summary: "Your training shows good consistency but needs more structured intensity work. Focus on quality over quantity with specific goal-pace workouts."
      });
    } else if (prompt.includes('Goal:')) {
      return JSON.stringify({
        realistic: true,
        confidence: 75,
        timeFrame: "6-9 months with consistent training",
        reasoning: "A 3:24 to 3:15 marathon represents a 4.4% improvement, which is achievable with focused training. Your recent training paces suggest you have the aerobic base. Key focus areas: speed work, race-pace practice, and consistent weekly mileage of 70-80km.",
        steps: [
          "Build weekly mileage to 70-80km over next 8 weeks",
          "Add weekly tempo run at goal marathon pace (4:37/km)",
          "Include weekly interval session (e.g., 8x800m at 5K pace)",
          "Progressive long runs up to 32km with last 10km at marathon pace",
          "Taper properly for 3 weeks before goal race",
          "Consider 2-3 half marathons as tune-up races"
        ]
      });
    } else if (prompt.includes('actionable recommendations')) {
      return JSON.stringify([
        "Add interval training: 1x per week doing 6-10 x 800m at 5K pace with 90sec recovery",
        "Include tempo runs: Weekly 20-30min at lactate threshold pace (comfortably hard)",
        "Increase long run distance by 10% each week up to 30-32km",
        "Add hill repeats: 8-10 x 90sec uphill efforts with easy jog down recovery",
        "Ensure proper recovery: Keep 80% of runs at easy conversational pace"
      ]);
    } else {
      return "Your recent races show strong performance with room for improvement through more structured speed work and recovery management.";
    }
  }

  private parseTrainingAnalysis(response: string, activities: Activity[]): TrainingAnalysis {
    try {
      const data = JSON.parse(response);
      return {
        mostEffectiveWorkouts: data.mostEffective.map((item: any) => ({
          activity: activities[item.index],
          effectiveness: item.effectiveness,
          reason: item.reason,
          metrics: {
            paceConsistency: 85,
            effortLevel: 75,
            recoveryIndicator: 90
          }
        })),
        leastEffectiveWorkouts: data.leastEffective.map((item: any) => ({
          activity: activities[item.index],
          effectiveness: item.effectiveness,
          reason: item.reason,
          metrics: {
            paceConsistency: 60,
            effortLevel: 50,
            recoveryIndicator: 40
          }
        })),
        improvementSuggestions: data.suggestions,
        goalAssessment: {
          currentPace: '',
          targetPace: '',
          timeFrame: '',
          realistic: true,
          confidence: 80,
          reasoning: data.summary,
          recommendedSteps: data.suggestions
        },
        summary: data.summary
      };
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      throw new Error('Invalid AI response format');
    }
  }

  private parseGoalAssessment(response: string, currentTime: number, targetTime: number): GoalAssessment {
    try {
      const data = JSON.parse(response);
      return {
        currentPace: this.formatTime(currentTime),
        targetPace: this.formatTime(targetTime),
        timeFrame: data.timeFrame,
        realistic: data.realistic,
        confidence: data.confidence,
        reasoning: data.reasoning,
        recommendedSteps: data.steps
      };
    } catch (e) {
      console.error('Failed to parse goal assessment:', e);
      throw new Error('Invalid goal assessment response');
    }
  }

  private parseImprovementAdvice(response: string): string[] {
    try {
      return JSON.parse(response);
    } catch (e) {
      // Fallback to splitting by newlines if not JSON
      return response.split('\n').filter(line => line.trim().length > 0);
    }
  }

  private calculatePace(distanceMeters: number, timeSeconds: number): string {
    const distanceKm = distanceMeters / 1000;
    const timeMinutes = timeSeconds / 60;
    const paceMinPerKm = timeMinutes / distanceKm;
    
    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.round((paceMinPerKm - minutes) * 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}/km`;
  }

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

