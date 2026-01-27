export interface Athlete {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  profile: string;
  profile_medium: string;
  city: string;
  state: string;
  country: string;
}

export interface Activity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  start_date: string;
  start_date_local: string;
  timezone: string;
  average_speed: number;
  max_speed: number;
  average_heartrate?: number;
  max_heartrate?: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  map: {
    id: string;
    summary_polyline: string;
  };
}

export interface AuthToken {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
  token_type: string;
  athlete?: Athlete;
}

export interface BestTime {
  distance: string;
  distanceMeters: number;
  time: number;
  pace: string;
  date: string;
  activityId: number;
  activityName: string;
}

export interface DistanceFilter {
  name: string;
  meters: number;
  tolerance: number; // tolerance in meters for matching activities
}
