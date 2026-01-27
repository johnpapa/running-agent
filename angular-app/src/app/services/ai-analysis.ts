import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity } from '../models/strava.models';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface TrainingAnalysis {
  mostEffectiveWorkouts: AnalyzedWorkout[];
  leastEffectiveWorkouts: AnalyzedWorkout[];
  improvementSuggestions: string[];
  goalAssessment: GoalAssessment;
  summary: string;
  heartRateAnalysis?: HeartRateAnalysis;
  fuelingAnalysis?: FuelingAnalysis;
  pacingAnalysis?: PacingAnalysis;
}

export interface HeartRateAnalysis {
  zones: {
    easy: number;
    moderate: number;
    hard: number;
    veryHard: number;
  };
  trends: string;
  recommendations: string;
}

export interface FuelingAnalysis {
  patterns: string;
  recommendations: string[];
}

export interface PacingAnalysis {
  negativeSplits: number;
  bonkingSessions: number;
  consistency: string;
  recommendations: string[];
}

export interface AnalyzedWorkout {
  activity: Activity;
  effectiveness: number;
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
  confidence: number;
  reasoning: string;
  recommendedSteps: string[];
  weeklyMileageTarget?: string;
  keyWorkouts?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AiAnalysisService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  analyzeTrainingEffectiveness(activities: Activity[]): Observable<TrainingAnalysis> {
    return this.http.post<any>(`${environment.apiUrl}/ai/analyze-training`, {
      activities
    }).pipe(
      map(response => this.parseTrainingAnalysis(response, activities))
    );
  }

  assessGoal(
    currentTime: number,
    targetTime: number,
    distance: string,
    recentActivities: Activity[]
  ): Observable<GoalAssessment> {
    return this.http.post<any>(`${environment.apiUrl}/ai/assess-goal`, {
      currentTime,
      targetTime,
      distance,
      recentActivities
    }).pipe(
      map(response => this.parseGoalAssessment(response, currentTime, targetTime))
    );
  }

  getImprovementAdvice(activities: Activity[]): Observable<string[]> {
    return this.http.post<any>(`${environment.apiUrl}/ai/improvement-advice`, {
      activities
    }).pipe(
      map(response => {
        if (response.recommendations) {
          return response.recommendations.map((r: any) => 
            typeof r === 'string' ? r : `${r.category}: ${r.advice}`
          );
        }
        return [];
      })
    );
  }

  analyzeRecentRaces(races: Activity[], trainingActivities: Activity[]): Observable<string> {
    if (races.length === 0) {
      return from(Promise.resolve('No races to analyze'));
    }

    return this.http.post<any>(`${environment.apiUrl}/ai/analyze-race`, {
      race: races[0],
      trainingActivities,
      streams: null
    }).pipe(
      map(response => this.formatRaceAnalysis(response))
    );
  }

  private parseTrainingAnalysis(response: any, activities: Activity[]): TrainingAnalysis {
    const mostEffective = (response.mostEffective || []).map((item: any) => ({
      activity: activities[item.index] || activities[0],
      effectiveness: item.effectiveness,
      reason: item.reason,
      metrics: {
        paceConsistency: 85,
        effortLevel: 75,
        recoveryIndicator: 90
      }
    }));

    const leastEffective = (response.leastEffective || []).map((item: any) => ({
      activity: activities[item.index] || activities[0],
      effectiveness: item.effectiveness,
      reason: item.reason,
      metrics: {
        paceConsistency: 60,
        effortLevel: 50,
        recoveryIndicator: 40
      }
    }));

    return {
      mostEffectiveWorkouts: mostEffective,
      leastEffectiveWorkouts: leastEffective,
      improvementSuggestions: response.suggestions || [],
      goalAssessment: {
        currentPace: '',
        targetPace: '',
        timeFrame: '',
        realistic: true,
        confidence: 80,
        reasoning: response.summary || '',
        recommendedSteps: response.suggestions || []
      },
      summary: response.summary || '',
      heartRateAnalysis: response.heartRateAnalysis,
      fuelingAnalysis: response.fuelingAnalysis,
      pacingAnalysis: response.pacingAnalysis
    };
  }

  private parseGoalAssessment(response: any, currentTime: number, targetTime: number): GoalAssessment {
    return {
      currentPace: this.formatTime(currentTime),
      targetPace: this.formatTime(targetTime),
      timeFrame: response.timeFrame || '',
      realistic: response.realistic || false,
      confidence: response.confidence || 0,
      reasoning: response.reasoning || '',
      recommendedSteps: response.steps || [],
      weeklyMileageTarget: response.weeklyMileageTarget,
      keyWorkouts: response.keyWorkouts
    };
  }

  private formatRaceAnalysis(response: any): string {
    if (!response) return 'No analysis available';

    let result = '';
    
    if (response.performance) {
      result += `Performance Rating: ${response.performance.rating}\n\n`;
      if (response.performance.strengths) {
        result += `Strengths:\n${response.performance.strengths.map((s: string) => `- ${s}`).join('\n')}\n\n`;
      }
      if (response.performance.weaknesses) {
        result += `Areas for Improvement:\n${response.performance.weaknesses.map((w: string) => `- ${w}`).join('\n')}\n\n`;
      }
    }

    if (response.pacing) {
      result += `Pacing Strategy: ${response.pacing.strategy}\n`;
      result += `${response.pacing.analysis}\n\n`;
    }

    if (response.heartRate) {
      result += `Heart Rate Analysis:\n${response.heartRate.efficiency}\n\n`;
    }

    if (response.trainingRecommendations) {
      result += `Training Recommendations:\n${response.trainingRecommendations.map((r: string) => `- ${r}`).join('\n')}`;
    }

    return result || 'Analysis complete';
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


