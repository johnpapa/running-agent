# Running Agent - Architecture Diagram

## System Architecture

This document provides a visual representation of the Running Agent application architecture, showing the relationships between the Angular frontend, Express.js backend API, and external services.

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Browser"
        A[Angular 21 Frontend]
        A1[Components Layer]
        A2[Services Layer]
        A3[Models Layer]
        
        A --> A1
        A --> A2
        A --> A3
    end
    
    subgraph "Backend API Server"
        B[Express.js + TypeScript]
        B1[Auth Routes]
        B2[Strava Proxy Routes]
        B3[AI Analysis Routes]
        
        B --> B1
        B --> B2
        B --> B3
    end
    
    subgraph "External Services"
        C[Strava API]
        D[OpenAI GPT-4 API]
    end
    
    A1 -->|HTTP/REST| B
    A2 -->|HTTP/REST| B
    B1 -->|OAuth 2.0| C
    B2 -->|REST API| C
    B3 -->|REST API| D
    
    style A fill:#dd0031,color:#fff
    style B fill:#68a063,color:#fff
    style C fill:#fc4c02,color:#fff
    style D fill:#10a37f,color:#fff
```

## Detailed Component Architecture

```mermaid
graph TB
    subgraph "Angular Frontend - Feature-Based Structure"
        subgraph "Core Module"
            AUTH_SERVICE[auth.service.ts]
            STRAVA_SERVICE[strava.service.ts]
            AUTH_MODELS[auth.models.ts]
            STRAVA_MODELS[strava.models.ts]
        end
        
        subgraph "Features Module"
            subgraph "Auth Feature"
                LOGIN[login.component]
                CALLBACK[auth-callback.component]
            end
            
            subgraph "Dashboard Feature"
                DASHBOARD[dashboard.component]
            end
            
            subgraph "Activities Feature"
                ACTIVITIES[activities.component]
                ACT_MODELS[activities.models.ts]
            end
            
            subgraph "Best Times Feature"
                BEST_TIMES[best-times.component]
            end
            
            subgraph "Training Analysis Feature"
                TRAINING[training-analysis.component]
                AI_SERVICE[ai-analysis.service.ts]
                AI_MODELS[ai-analysis.models.ts]
            end
        end
    end
    
    LOGIN -->|uses| AUTH_SERVICE
    CALLBACK -->|uses| AUTH_SERVICE
    DASHBOARD -->|uses| STRAVA_SERVICE
    ACTIVITIES -->|uses| STRAVA_SERVICE
    BEST_TIMES -->|uses| STRAVA_SERVICE
    TRAINING -->|uses| AI_SERVICE
    TRAINING -->|uses| STRAVA_SERVICE
    AI_SERVICE -->|HTTP| AUTH_SERVICE
    
    style AUTH_SERVICE fill:#1976d2,color:#fff
    style STRAVA_SERVICE fill:#1976d2,color:#fff
    style AI_SERVICE fill:#1976d2,color:#fff
```

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Angular as Angular Frontend
    participant API as Express.js API
    participant Strava as Strava API
    participant OpenAI as OpenAI GPT-4
    
    Note over User,OpenAI: Authentication Flow
    User->>Angular: Click "Connect with Strava"
    Angular->>API: GET /auth/url
    API-->>Angular: Authorization URL
    Angular->>Strava: Redirect to OAuth
    Strava-->>User: Authorization Page
    User->>Strava: Approve Access
    Strava-->>Angular: Redirect with code
    Angular->>API: POST /auth/token {code}
    API->>Strava: Exchange code for token
    Strava-->>API: Access Token + Athlete
    API-->>Angular: Token + Athlete Data
    Angular->>Angular: Store token in localStorage
    
    Note over User,OpenAI: Activity Data Flow
    User->>Angular: Navigate to Activities
    Angular->>API: GET /activities (with token)
    API->>Strava: GET /athlete/activities
    Strava-->>API: Activities JSON
    API-->>Angular: Activities Data
    Angular->>Angular: Display in Component
    
    Note over User,OpenAI: AI Analysis Flow
    User->>Angular: Request Training Analysis
    Angular->>API: GET /activities (recent)
    API->>Strava: GET /athlete/activities
    Strava-->>API: Activities Data
    API-->>Angular: Activities
    Angular->>API: POST /ai/analyze-training {activities}
    API->>OpenAI: Analyze with GPT-4
    OpenAI-->>API: Analysis Results
    API-->>Angular: Training Insights
    Angular->>Angular: Display AI Analysis
```

## Backend API Endpoints

```mermaid
graph LR
    subgraph "Authentication Endpoints"
        E1[GET /auth/url]
        E2[POST /auth/token]
        E3[POST /auth/refresh]
    end
    
    subgraph "Strava Data Endpoints"
        E4[GET /athlete]
        E5[GET /activities]
        E6[GET /activities/:id]
        E7[GET /activities/:id/streams]
    end
    
    subgraph "AI Analysis Endpoints"
        E8[POST /ai/analyze-training]
        E9[POST /ai/assess-goal]
        E10[POST /ai/improvement-advice]
        E11[POST /ai/analyze-race]
    end
    
    CLIENT[Angular Client]
    
    CLIENT --> E1
    CLIENT --> E2
    CLIENT --> E3
    CLIENT --> E4
    CLIENT --> E5
    CLIENT --> E6
    CLIENT --> E7
    CLIENT --> E8
    CLIENT --> E9
    CLIENT --> E10
    CLIENT --> E11
```

## Technology Stack

```mermaid
graph TB
    subgraph "Frontend Technologies"
        F1[Angular 21]
        F2[TypeScript 5.9]
        F3[RxJS 7.8]
        F4[SCSS]
        F5[Angular Router]
        F6[HttpClient]
    end
    
    subgraph "Backend Technologies"
        B1[Express.js 4.x]
        B2[TypeScript 5.x]
        B3[Axios]
        B4[OpenAI SDK]
        B5[CORS]
        B6[dotenv]
    end
    
    subgraph "External APIs"
        API1[Strava API v3]
        API2[OpenAI GPT-4]
    end
    
    F1 --> F2
    F1 --> F3
    F1 --> F5
    F1 --> F6
    B1 --> B2
    B1 --> B3
    B1 --> B4
    B1 --> B5
    
    F6 -.->|HTTP| B1
    B3 -.->|HTTP| API1
    B4 -.->|HTTP| API2
```

## Security Architecture

```mermaid
graph TB
    subgraph "Frontend - Public"
        FE[Angular App]
        LS[localStorage]
        FE -->|Stores Token| LS
    end
    
    subgraph "Backend - Secure"
        BE[Express API]
        ENV[.env Variables]
        BE -->|Reads| ENV
    end
    
    subgraph "Security Measures"
        S1[OAuth 2.0]
        S2[Token Exchange on Server]
        S3[No API Keys in Frontend]
        S4[CORS Protection]
        S5[Environment Variables]
    end
    
    FE -->|HTTPS| BE
    BE -->|OAuth| S1
    BE -->|Secure| S2
    FE -.->|Never Exposed| S3
    BE -->|Configured| S4
    BE -->|Uses| S5
    
    style S1 fill:#4caf50,color:#fff
    style S2 fill:#4caf50,color:#fff
    style S3 fill:#4caf50,color:#fff
    style S4 fill:#4caf50,color:#fff
    style S5 fill:#4caf50,color:#fff
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        D1[localhost:4200 - Angular Dev Server]
        D2[localhost:3000 - API Server]
    end
    
    subgraph "Production Environment"
        P1[Static Hosting - Angular Build]
        P2[Node.js Server - API]
        P3[Environment Config]
    end
    
    subgraph "CI/CD"
        CI1[GitHub Actions]
        CI2[Build Process]
        CI3[Tests - Playwright]
        CI4[Deployment]
    end
    
    D1 -->|npm start| Angular
    D2 -->|npm run dev| Express
    
    P1 -->|ng build| Dist[dist/]
    P2 -->|npm start| Server[server.js]
    P3 -->|.env| Server
    
    CI1 --> CI2
    CI2 --> CI3
    CI3 --> CI4
    
    style D1 fill:#ffc107,color:#000
    style D2 fill:#ffc107,color:#000
    style P1 fill:#4caf50,color:#fff
    style P2 fill:#4caf50,color:#fff
```

## Key Design Patterns

### 1. **Feature-Based Folder Structure**
- Organizes code by business features rather than technical layers
- Each feature has its components, services, and models co-located
- Follows John Papa's Angular Style Guide

### 2. **Service Layer Pattern**
- Core services (`auth.service`, `strava.service`) handle all API communication
- Feature-specific services (`ai-analysis.service`) handle specialized logic
- Services are singleton and dependency-injected

### 3. **Reactive Programming**
- Uses RxJS Observables for async data streams
- BehaviorSubject for state management (currentUser)
- Operators like `map`, `tap`, `catchError` for data transformation

### 4. **API Proxy Pattern**
- Backend API acts as secure proxy to external services
- Prevents exposure of API keys and secrets
- Centralizes authentication and error handling

### 5. **OAuth 2.0 Flow**
- Standard three-legged OAuth for user authorization
- Token exchange happens server-side
- Refresh token mechanism for long-lived sessions

## Component Communication

```mermaid
graph LR
    subgraph "Parent-Child Communication"
        P[Parent Component] -->|@Input| C[Child Component]
        C -->|@Output| P
    end
    
    subgraph "Service-Based Communication"
        C1[Component 1] -->|Inject| S[Shared Service]
        S -->|Observable| C2[Component 2]
    end
    
    subgraph "Router State"
        R[Router] -->|Params| RC[Routed Component]
        RC -->|Navigate| R
    end
```

## Performance Considerations

- **Lazy Loading**: Routes can be lazy-loaded for faster initial load
- **Change Detection**: OnPush strategy for optimized rendering
- **HTTP Caching**: Browser caching for static assets
- **API Pagination**: Activities loaded in batches (30 per page)
- **Observable Unsubscription**: Proper cleanup to prevent memory leaks

## Error Handling

```mermaid
graph TB
    REQ[HTTP Request] -->|Success| SUCCESS[Process Response]
    REQ -->|Error| ERROR[Error Handler]
    ERROR -->|401| AUTH[Redirect to Login]
    ERROR -->|429| RATE[Rate Limit Message]
    ERROR -->|500| SERVER[Server Error Message]
    ERROR -->|Network| NETWORK[Network Error Message]
    
    SUCCESS --> UI[Update UI]
    AUTH --> UI
    RATE --> UI
    SERVER --> UI
    NETWORK --> UI
```

## Future Enhancements

1. **State Management**: Consider NgRx for complex state
2. **Progressive Web App**: Add service workers for offline support
3. **Real-time Updates**: WebSocket integration for live data
4. **Advanced Caching**: IndexedDB for offline activity storage
5. **Multi-language Support**: i18n internationalization
6. **Analytics**: User behavior tracking and performance monitoring

## Related Documentation

- [BACKEND_API_SETUP.md](../BACKEND_API_SETUP.md) - Backend setup guide
- [FEATURES.md](../FEATURES.md) - Feature documentation
- [AGENTS.md](../AGENTS.md) - Development guidelines and style guide
- [README.md](../README.md) - Project overview
