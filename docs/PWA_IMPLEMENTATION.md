# Progressive Web App (PWA) Implementation

## Overview

Running Agent is now a fully-featured Progressive Web App (PWA) that can be installed on desktop and mobile devices, works offline, and provides a native app-like experience.

## Features

### ✅ Installable
- Meets all PWA installability criteria
- Custom install prompt with user-friendly UI
- Works on all major platforms (iOS, Android, Desktop)
- Remembers user's install/dismiss preference

### ✅ Offline Support
- Service worker caches app shell for instant loading
- API responses cached with smart strategies
- Graceful degradation when offline
- Background sync capabilities

### ✅ Responsive Design
- Optimized for all screen sizes:
  - Desktop (1920px+)
  - Laptop (1366px-1920px)
  - Tablet (768px-1024px)
  - Mobile (320px-428px)
- Touch-friendly UI (44px minimum tap targets)
- Responsive images and layouts
- Mobile-first CSS approach

### ✅ Performance
- Lazy loading of routes
- Optimized bundle sizes
- Preloading critical resources
- Fast initial load times

## Architecture

### Service Worker Configuration

**File**: `src/ngsw-config.json`

#### App Shell Caching (Prefetch)
- HTML, CSS, JavaScript bundles
- Favicon and manifest
- Loaded immediately on first visit

#### Asset Caching (Lazy)
- Images, fonts, icons
- Loaded on demand
- Updated on subsequent visits

#### API Caching Strategies

1. **Strava API** (Freshness Strategy)
   - Network-first approach
   - Falls back to cache if offline
   - 1-hour cache duration
   - 100 cached items maximum

2. **Backend API** (Performance Strategy)
   - Cache-first approach
   - Faster response times
   - 30-minute cache duration
   - 50 cached items maximum

### Web App Manifest

**File**: `src/manifest.webmanifest`

```json
{
  "name": "Running Agent",
  "short_name": "Running",
  "theme_color": "#fc4c02",
  "background_color": "#6366f1",
  "display": "standalone",
  "start_url": "/"
}
```

#### Key Properties:
- **name**: Full app name shown during install
- **short_name**: Name shown on home screen (limited space)
- **theme_color**: Status bar color (matches Strava orange)
- **background_color**: Splash screen background
- **display**: Standalone mode (hides browser UI)
- **icons**: Multiple sizes for different platforms

## Installation Instructions

### iOS/iPadOS (Safari)
1. Open Running Agent in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Customize the name if desired
5. Tap "Add"

**Note**: iOS requires Safari specifically; Chrome/Firefox on iOS do not support PWA installation.

### Android (Chrome/Edge)
1. Open Running Agent in Chrome or Edge
2. Tap the menu (three dots)
3. Tap "Install App" or "Add to Home Screen"
4. Confirm installation
5. App appears on home screen and app drawer

### Desktop (Chrome/Edge/Opera)
1. Open Running Agent in browser
2. Look for install icon in address bar (⊕ or ⬇)
3. Click icon and confirm installation
4. App opens in standalone window
5. Access from Start Menu/Applications

## User Experience Enhancements

### Install Prompt Component

**Location**: `src/app/shared/components/install-prompt/`

- Non-intrusive banner at bottom of screen
- Appears only when app is installable
- User can install or dismiss
- Remembers dismissal in localStorage
- Beautiful gradient design matching brand

### Responsive Design Patterns

#### Breakpoint Strategy
```scss
// Mobile-first approach
.component {
  // Base styles (mobile)
  padding: 12px;
  
  // Tablet
  @media (min-width: 768px) {
    padding: 16px;
  }
  
  // Desktop
  @media (min-width: 1024px) {
    padding: 20px;
  }
}
```

#### Touch-Friendly Targets
- Minimum 44px × 44px tap targets
- Proper spacing between interactive elements
- Larger buttons on mobile devices
- Easy-to-tap navigation

#### Typography Scaling
- Font sizes adjust per breakpoint
- Readable text on small screens
- Optimal line lengths on large screens

## Development Guidelines

### Testing PWA Features

#### Local Testing
```bash
# Build production version
npm run build

# Serve with HTTPS (required for service worker)
npx http-server dist/angular-app/browser -p 8080 --ssl
```

#### Service Worker Debugging
1. Open DevTools → Application tab
2. Check Service Workers section
3. Verify registration status
4. Test Update on reload
5. Clear cache to reset

#### Manifest Validation
1. DevTools → Application → Manifest
2. Verify all properties load correctly
3. Check icon paths
4. Test theme colors

### Performance Monitoring

#### Lighthouse Audit
```bash
# Run Lighthouse
npm install -g lighthouse
lighthouse https://localhost:8080 --view
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+
- PWA: 100

### Common Issues & Solutions

#### Service Worker Not Registering
- Ensure HTTPS (required except localhost)
- Check browser console for errors
- Verify `ngsw-config.json` is valid JSON
- Clear cache and hard reload

#### Icons Not Showing
- Check icon file paths in manifest
- Verify icons exist in `assets/icons/`
- Ensure correct MIME type (image/png)
- Test with Lighthouse PWA audit

#### Install Prompt Not Appearing
- PWA must be served over HTTPS
- Manifest must be valid
- Icons must be present and valid
- Service worker must be registered
- App must meet installability criteria

## Browser Support

### Full PWA Support
- ✅ Chrome 67+ (Desktop & Android)
- ✅ Edge 79+ (Desktop & Android)
- ✅ Safari 11.1+ (iOS/iPadOS)
- ✅ Samsung Internet 8.2+
- ✅ Firefox 44+ (Limited)
- ✅ Opera 54+

### Feature Matrix

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| Web Manifest | ✅ | ✅ | ⚠️ | ✅ |
| Install Prompt | ✅ | ✅* | ❌ | ✅ |
| Offline | ✅ | ✅ | ✅ | ✅ |
| Push Notifications | ✅ | ⚠️ | ✅ | ✅ |

*Safari uses Add to Home Screen instead of install prompt

## Future Enhancements

### Planned Features
- [ ] Push notifications for PR achievements
- [ ] Background sync for offline data entry
- [ ] App shortcuts for quick actions
- [ ] Share target API for sharing runs
- [ ] Periodic background sync
- [ ] Web share API integration

### Performance Optimizations
- [ ] Route-based code splitting
- [ ] Virtual scrolling for long lists
- [ ] Image lazy loading
- [ ] Preconnect to API domains
- [ ] Resource hints (prefetch, preload)

### A11y Improvements
- [ ] Screen reader testing
- [ ] Keyboard navigation audit
- [ ] High contrast mode support
- [ ] Reduced motion support

## Resources

### Documentation
- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev: PWA](https://web.dev/progressive-web-apps/)
- [Angular Service Worker](https://angular.dev/ecosystem/service-workers)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PWA Builder](https://www.pwabuilder.com/)
- [Maskable.app](https://maskable.app/)
- [WebPageTest](https://www.webpagetest.org/)

### Testing
- [BrowserStack](https://www.browserstack.com/) - Cross-browser testing
- [LambdaTest](https://www.lambdatest.com/) - Mobile device testing

## Maintenance

### Regular Tasks
- Monitor Lighthouse scores
- Test on new browser versions
- Update service worker cache versioning
- Optimize bundle sizes
- Review and update dependencies

### Updating Service Worker
When making breaking changes:
1. Update `ngsw-config.json`
2. Increment version if needed
3. Test cache invalidation
4. Deploy and monitor rollout

## Support

For issues related to PWA functionality:
1. Check browser console for errors
2. Verify service worker status in DevTools
3. Test in incognito/private mode
4. Clear cache and retry
5. Check browser compatibility

---

**Last Updated**: January 2026
**Angular Version**: 21.1.1
**Service Worker**: @angular/service-worker 21.1.1
