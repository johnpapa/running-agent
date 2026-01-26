import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiAnalysisService, TrainingAnalysis as AnalysisResult, GoalAssessment } from '../../services/ai-analysis';
import { StravaService } from '../../services/strava.service';
import { Activity } from '../../models/strava.models';

@Component({
  selector: 'app-training-analysis',
  imports: [CommonModule, FormsModule],
  templateUrl: './training-analysis.html',
  styleUrl: './training-analysis.scss',
})
export class TrainingAnalysisComponent implements OnInit {
  activities: Activity[] = [];
  analysis: AnalysisResult | null = null;
  goalAssessment: GoalAssessment | null = null;
  improvementAdvice: string[] = [];
  loading = false;
  error: string | null = null;

  // Goal assessment inputs
  currentMarathonTime = '3:24:00'; // Example: 3 hours 24 minutes
  targetMarathonTime = '3:15:00';  // Example: 3 hours 15 minutes

  constructor(
    private aiService: AiAnalysisService,
    private stravaService: StravaService
  ) {}

  getTotalDistance(): number {
    return this.activities.reduce((sum, a) => sum + a.distance, 0);
  }

  getTotalTime(): number {
    return this.activities.reduce((sum, a) => sum + a.moving_time, 0);
  }


  ngOnInit(): void {
    this.loadActivitiesAndAnalyze();
  }

  loadActivitiesAndAnalyze(): void {
    this.loading = true;
    this.error = null;

    this.stravaService.getAllActivities().subscribe({
      next: (activities) => {
        this.activities = activities.filter(a => a.type === 'Run' || a.sport_type === 'Run');
        this.analyzeTraining();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load activities';
        console.error('Error loading activities:', err);
        this.loading = false;
      }
    });
  }

  analyzeTraining(): void {
    if (this.activities.length === 0) {
      this.error = 'No activities to analyze';
      return;
    }

    this.loading = true;

    // Analyze training effectiveness
    this.aiService.analyzeTrainingEffectiveness(this.activities).subscribe({
      next: (analysis) => {
        this.analysis = analysis;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error analyzing training:', err);
        this.loading = false;
      }
    });

    // Get improvement advice
    this.aiService.getImprovementAdvice(this.activities).subscribe({
      next: (advice) => {
        this.improvementAdvice = advice;
      },
      error: (err) => {
        console.error('Error getting improvement advice:', err);
      }
    });
  }

  assessGoal(): void {
    const currentSeconds = this.timeStringToSeconds(this.currentMarathonTime);
    const targetSeconds = this.timeStringToSeconds(this.targetMarathonTime);

    if (currentSeconds <= targetSeconds) {
      this.error = 'Target time must be faster than current time';
      return;
    }

    this.loading = true;
    this.error = null;

    this.aiService.assessGoal(
      currentSeconds,
      targetSeconds,
      'Marathon',
      this.activities
    ).subscribe({
      next: (assessment) => {
        this.goalAssessment = assessment;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to assess goal';
        console.error('Error assessing goal:', err);
        this.loading = false;
      }
    });
  }

  private timeStringToSeconds(timeStr: string): number {
    const parts = timeStr.split(':').map(p => parseInt(p, 10));
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return parseInt(timeStr, 10);
  }

  formatDistance(meters: number): string {
    return this.stravaService.formatDistance(meters);
  }

  formatTime(seconds: number): string {
    return this.stravaService.formatTime(seconds);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  }

  getEffectivenessColor(effectiveness: number): string {
    if (effectiveness >= 80) return '#4caf50'; // green
    if (effectiveness >= 60) return '#ff9800'; // orange
    return '#f44336'; // red
  }

  getConfidenceColor(confidence: number): string {
    if (confidence >= 70) return '#4caf50'; // green
    if (confidence >= 50) return '#ff9800'; // orange
    return '#f44336'; // red
  }
}

