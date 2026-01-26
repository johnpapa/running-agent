# UI Workflow Documentation - Running Agent

This document provides a comprehensive visual walkthrough of the Running Agent application, demonstrating all UI features and user workflows using Playwright-generated screenshots.

## Complete Application Workflow

The Running Agent application provides a seamless experience for tracking running activities, viewing personal records, and getting AI-powered training insights. Below is the complete UI workflow with screenshots:

---

## 1. Login Screen

![Login Page](https://github.com/user-attachments/assets/24677b60-958c-40e5-be8e-209ca31b2098)

**Features:**
- Clean, modern design with Strava branding colors
- Prominent "Connect with Strava" button for OAuth authentication
- Clear setup instructions for first-time users
- Information about configuring the Strava MCP server
- Gradient background for visual appeal

**User Actions:**
- Click "Connect with Strava" to initiate OAuth flow
- Redirected to Strava authorization page
- After authorization, redirected back to application

---

## 2. Dashboard - Activities Tab

![Activities Dashboard](https://github.com/user-attachments/assets/264646fe-973b-44d8-bcbd-3e2c6153ed6a)

**Features Demonstrated:**
- ✅ User profile in navigation bar with avatar and name
- ✅ Logout button always accessible
- ✅ Active tab highlighting (Activities tab shown in orange gradient)
- ✅ Search functionality with placeholder text
- ✅ Activity cards showing real workout data
- ✅ Comprehensive metrics for each activity

**Layout:**
- Top navigation bar with user profile and logout button
- Three tabs: Activities, Best Times, AI Analysis
- Activities tab shows searchable list of running activities

**Features:**
- **Search Functionality**: Real-time search box to filter activities by name, type, or keyword
- **Activity Cards**: Each activity displays:
  - Activity name and sport type badge
  - Date and time
  - Distance (km)
  - Duration (HH:MM:SS)
  - Average pace (/km)
  - Elevation gain
  - Kudos and comment counts
- **Responsive Grid**: Cards adapt to screen size
- **Empty State**: Helpful message when no activities match search

**UI Elements:**
```
┌─────────────────────────────────────────────────────────┐
│  🏃 Running Agent      [Profile Pic] John Doe  [Logout] │
├─────────────────────────────────────────────────────────┤
│  [Activities] [Best Times] [AI Analysis]                │
├─────────────────────────────────────────────────────────┤
│  Your Running Activities                                │
│  [🔍 Search activities...]                              │
│                                                          │
│  ┌──────────────────────────────────────┐              │
│  │ Morning Run              [Run]        │              │
│  │ Dec 20, 2025 @ 6:30 AM               │              │
│  │                                       │              │
│  │ 📏 10.50 km  ⏱️ 52:30  📈 5:00/km    │              │
│  │ ⛰️ 125m      ❤️ 15     💬 3          │              │
│  └──────────────────────────────────────┘              │
│                                                          │
│  ┌──────────────────────────────────────┐              │
│  │ Track Workout            [Run]        │              │
│  │ Dec 18, 2025 @ 5:00 PM               │              │
│  │ 📏 8.00 km   ⏱️ 36:20  📈 4:32/km    │              │
│  └──────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Dashboard - Best Times Tab

![Best Times Dashboard](https://github.com/user-attachments/assets/5a6a6c6c-f8b7-4d78-8ad8-bc5c100b3075)

**Features Demonstrated:**
- ✅ Best Times tab active (orange gradient highlighting)
- ✅ Grid layout with 6 PR cards (1 Mile, 5K, 10K, 15K, Half Marathon, Marathon)
- ✅ Star icon badges on each card
- ✅ Large time displays for quick scanning
- ✅ Pace information in orange accent color
- ✅ Date and activity name for context
- ✅ Gradient card headers for visual appeal

**Personal Records Shown:**
- 5K: 21:45 (4:21/km pace) from City 5K Race
- 10K: 45:30 (4:33/km pace) from Turkey Trot 10K
- Half Marathon: 1:38:20 (4:39/km pace) from City Half Marathon
- 1 Mile: 5:42 (3:33/km pace) from Track Time Trial
- 15K: 1:08:15 (4:33/km pace) from Summer 15K
- Marathon: 3:24:30 (4:52/km pace) from Spring Marathon

**Layout:**
- Same navigation bar and tabs
- Grid of personal record cards for standard race distances

**Features:**
- **Distance Categories**: 1 Mile, 5K, 10K, 15K, Half Marathon, Marathon
- **PR Cards**: Each card displays:
  - Distance name with star icon
  - Best time (HH:MM:SS)
  - Average pace (/km)
  - Date achieved
  - Activity name link
- **Color-coded**: Cards use gradient styling
- **Hover Effects**: Interactive hover animations
- **Empty State**: Message encouraging runners to complete standard distance runs

**UI Elements:**
```
┌─────────────────────────────────────────────────────────┐
│  🏃 Running Agent      [Profile Pic] John Doe  [Logout] │
├─────────────────────────────────────────────────────────┤
│  [Activities] [Best Times] [AI Analysis]                │
├─────────────────────────────────────────────────────────┤
│  Your Best Times                                        │
│  Your fastest recorded times for standard distances     │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ ⭐ 5K       │  │ ⭐ 10K      │  │ ⭐ Half     │ │
│  │              │  │              │  │  Marathon    │ │
│  │   21:45      │  │   45:30      │  │   1:38:20    │ │
│  │  4:21/km     │  │  4:33/km     │  │  4:39/km     │ │
│  │              │  │              │  │              │ │
│  │ 📅 Dec 15    │  │ 📅 Nov 20    │  │ 📅 Oct 10    │ │
│  │ 📝 5K Race   │  │ 📝 Tempo Run │  │ 📝 City Half │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ ⭐ 1 Mile   │  │ ⭐ 15K      │  │ ⭐ Marathon │ │
│  │   5:42       │  │   1:08:15    │  │   3:24:30    │ │
│  │  3:33/km     │  │  4:33/km     │  │  4:52/km     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Dashboard - AI Analysis Tab

![AI Analysis Dashboard](https://github.com/user-attachments/assets/f003a400-2c2f-4a5b-a38f-f85e9865e57d)

**Features Demonstrated:**

### 🎯 Goal Assessment Section
- ✅ Input fields for current (3:24:00) and target (3:15:00) marathon times
- ✅ "Assess My Goal" action button
- ✅ AI-generated assessment result card with:
  - Green header indicating realistic goal
  - 75% confidence score badge
  - Detailed reasoning and analysis
  - 6-step training plan to achieve the goal
  - Specific paces and volume recommendations

### 💪 Training Effectiveness Analysis
**Most Effective Workouts (Green badges - 85-92% scores):**
- Progressive Long Run: 92% - "Excellent endurance building"
- Tempo Run at Goal Pace: 88% - "Race-specific fitness"
- Easy Recovery Run: 85% - "Supports adaptation"

**Least Effective Workouts (Red badges - 35-45% scores):**
- Easy Run Too Fast: 45% - "Preventing proper recovery"
- Inconsistent Pace Run: 40% - "Lacks specific purpose"
- No Warmup Intervals: 35% - "Increases injury risk"

### 🚀 How to Get Faster
- ✅ 5 numbered recommendation cards
- ✅ Specific, actionable advice:
  1. Interval training protocol
  2. Tempo run guidance
  3. Long run progression
  4. Hill repeat workouts
  5. Recovery management

**Layout:**
- Same navigation bar and tabs
- Three main sections with expandable cards

**Features:**

### 4.1 Goal Assessment Section
- **Input Fields**: 
  - Current marathon time (HH:MM:SS)
  - Target marathon time (HH:MM:SS)
  - "Assess My Goal" button
- **Results Display**:
  - Confidence score badge (0-100%)
  - Realistic/Challenging indicator
  - Timeframe estimate
  - Detailed reasoning
  - Step-by-step training plan

### 4.2 Training Effectiveness Section
- **Most Effective Workouts**:
  - Top 3 workouts with effectiveness scores (80-95%)
  - Activity details (distance, time, pace)
  - AI reasoning for each
  - Color-coded score badges (green)
  
- **Least Effective Workouts**:
  - Bottom 3 workouts with scores (35-50%)
  - Activity details
  - AI improvement suggestions
  - Color-coded score badges (red/orange)

### 4.3 Improvement Recommendations
- **5 Actionable Tips**:
  - Numbered recommendations (1-5)
  - Specific, personalized advice
  - Based on training patterns
  - Icons for visual interest

### 4.4 Key Insights Dashboard
- **Training Metrics Cards**:
  - Total runs analyzed
  - Total training time
  - Total distance covered
  - Each with icon and emphasis styling

**UI Elements:**
```
┌─────────────────────────────────────────────────────────┐
│  🏃 Running Agent      [Profile Pic] John Doe  [Logout] │
├─────────────────────────────────────────────────────────┤
│  [Activities] [Best Times] [AI Analysis]                │
├─────────────────────────────────────────────────────────┤
│  🏃 AI-Powered Training Analysis                        │
│  Get personalized insights and improvement suggestions  │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🎯 Goal Assessment                              │   │
│  │                                                  │   │
│  │ Current Marathon Time: [3:24:00]                │   │
│  │ Target Marathon Time:  [3:15:00]                │   │
│  │ [Assess My Goal]                                │   │
│  │                                                  │   │
│  │ ✅ Goal is Realistic!        Confidence: 75%   │   │
│  │                                                  │   │
│  │ Time Frame: 6-9 months with consistent training│   │
│  │                                                  │   │
│  │ Analysis: A 3:24 to 3:15 marathon represents   │   │
│  │ a 4.4% improvement, which is achievable...     │   │
│  │                                                  │   │
│  │ Recommended Steps:                              │   │
│  │ 1. Build weekly mileage to 70-80km             │   │
│  │ 2. Add weekly tempo run at goal pace           │   │
│  │ 3. Include interval sessions (8x800m)          │   │
│  │ 4. Progressive long runs up to 32km            │   │
│  │ 5. Taper properly for 3 weeks before race      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 💪 Training Effectiveness Analysis              │   │
│  │                                                  │   │
│  │ ✨ Most Effective Workouts                      │   │
│  │ ┌──────────────────────────────────────┐       │   │
│  │ │ Progressive Long Run          [92%]  │       │   │
│  │ │ Dec 20 • 22.5 km • 1:52:30 • 5:00/km│       │   │
│  │ │ Shows excellent endurance building   │       │   │
│  │ └──────────────────────────────────────┘       │   │
│  │                                                  │   │
│  │ ⚠️ Least Effective Workouts                     │   │
│  │ ┌──────────────────────────────────────┐       │   │
│  │ │ Easy Run Too Fast             [45%]  │       │   │
│  │ │ Dec 18 • 8.0 km • 35:20 • 4:25/km   │       │   │
│  │ │ Too fast for recovery, hindering    │       │   │
│  │ │ adaptation                           │       │   │
│  │ └──────────────────────────────────────┘       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🚀 How to Get Faster                            │   │
│  │                                                  │   │
│  │ ①  Add interval training: 1x per week doing    │   │
│  │     6-10 x 800m at 5K pace with 90sec recovery │   │
│  │                                                  │   │
│  │ ②  Include tempo runs: Weekly 20-30min at      │   │
│  │     lactate threshold pace                      │   │
│  │                                                  │   │
│  │ ③  Increase long run distance by 10% weekly    │   │
│  │     up to 30-32km                               │   │
│  │                                                  │   │
│  │ ④  Add hill repeats: 8-10 x 90sec uphill       │   │
│  │     efforts with easy jog down                  │   │
│  │                                                  │   │
│  │ ⑤  Ensure proper recovery: Keep 80% of runs    │   │
│  │     at easy conversational pace                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 📊 Key Insights                                 │   │
│  │                                                  │   │
│  │  [📈]           [⏱️]           [🏃]             │   │
│  │  Training      Total Time     Total Distance   │   │
│  │  Volume                                         │   │
│  │  45 runs       24:35:00       425.5 km         │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 5. User Profile Section

**Features:**
- User avatar (from Strava profile)
- User name display
- Logout button
- Consistent across all tabs

---

## Design Principles

### Color Scheme
- **Primary**: Strava Orange (#FC4C02, #D84315)
- **Background**: Purple Gradient (#667eea to #764ba2)
- **Cards**: White with subtle shadows
- **Text**: Dark gray (#333) for primary, lighter grays for secondary
- **Success**: Green (#4caf50)
- **Warning**: Orange (#ff9800)
- **Error**: Red (#f44336)

### Typography
- **Headers**: Bold, 24-32px
- **Body**: Regular, 14-16px
- **Labels**: Semi-bold, 12-14px
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto

### Interaction Design
- **Hover Effects**: Subtle scale transforms and shadow increases
- **Loading States**: Spinner animations with branded colors
- **Empty States**: Friendly icons and helpful messages
- **Error States**: Clear error messages with retry options

### Responsive Behavior
- **Mobile**: Single column layout, touch-friendly buttons
- **Tablet**: 2-column grid for cards
- **Desktop**: 3-column grid, side-by-side comparisons

---

## Key Features Demonstrated

✅ **OAuth Authentication**: Secure Strava integration
✅ **Activity Search**: Real-time filtering capabilities
✅ **Personal Records**: Automatic PR tracking for 6 standard distances
✅ **AI Goal Assessment**: Realistic goal evaluation with confidence scores
✅ **Training Analysis**: Identifies effective and ineffective workouts
✅ **Improvement Recommendations**: 5 personalized, actionable tips
✅ **Visual Analytics**: Key insights dashboard
✅ **Responsive Design**: Works on all device sizes
✅ **Modern UI**: Clean, professional interface with smooth animations

---

## Technology Stack

- **Frontend**: Angular 21 (latest)
- **Styling**: SCSS with custom design system
- **Icons**: Inline SVG icons
- **State Management**: RxJS
- **AI Integration**: GitHub Copilot SDK
- **API Integration**: Strava MCP Server

---

## User Flow Summary

1. **Landing** → Login page with OAuth button
2. **Authentication** → Redirect to Strava, authorize, return to app
3. **Dashboard** → Default to Activities tab showing recent runs
4. **Search** → Filter activities by name/type
5. **Best Times** → View personal records across distances
6. **AI Analysis** → Input goal, get assessment and recommendations
7. **Insights** → View training effectiveness and improvement tips

This workflow ensures users can quickly access their data, understand their performance, and get actionable insights to improve.
