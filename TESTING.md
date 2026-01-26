# Testing Checklist

## Prerequisites for Testing
- [ ] Strava API credentials obtained
- [ ] MCP server `.env` configured
- [ ] Both servers running (Angular on :4200, MCP on :3001)

## 1. Authentication Flow

### Login Page
- [ ] Login page loads without errors
- [ ] Strava logo is visible
- [ ] "Connect with Strava" button is styled correctly
- [ ] Setup instructions are clear and visible
- [ ] Clicking "Connect with Strava" redirects to Strava OAuth page

### Strava OAuth
- [ ] Strava authorization page loads
- [ ] Correct scopes are requested (activity:read_all, profile:read_all)
- [ ] Can approve the authorization
- [ ] Redirects back to callback URL

### Callback Handler
- [ ] Loading spinner shows during token exchange
- [ ] Successfully exchanges code for access token
- [ ] Redirects to dashboard on success
- [ ] Shows error message if authorization fails

## 2. Dashboard

### Navigation Bar
- [ ] Navbar displays correctly
- [ ] Strava logo visible in navbar
- [ ] User profile picture displays
- [ ] User name displays correctly
- [ ] Logout button is visible and functional

### Tabs
- [ ] "Activities" tab is styled correctly
- [ ] "Best Times" tab is styled correctly
- [ ] Can switch between tabs
- [ ] Active tab is highlighted
- [ ] Content changes when switching tabs

### Logout
- [ ] Clicking logout clears session
- [ ] Redirects to login page
- [ ] Cannot access dashboard without re-authentication

## 3. Activities Component

### Initial Load
- [ ] Loading spinner displays while fetching
- [ ] Activities load successfully
- [ ] Activities display in cards
- [ ] Most recent activities show first

### Activity Card Display
- [ ] Activity name displays
- [ ] Sport type badge shows correct type
- [ ] Date formatted correctly
- [ ] Distance formatted in km
- [ ] Time formatted (HH:MM:SS or MM:SS)
- [ ] Pace calculated and displayed correctly
- [ ] Elevation gain displays (if available)
- [ ] Kudos count shows
- [ ] Comment count shows

### Search Functionality
- [ ] Search box is visible
- [ ] Can type in search box
- [ ] Results filter as you type
- [ ] Can search by activity name
- [ ] Can search by activity type
- [ ] Clearing search shows all activities
- [ ] Shows "No activities found" when search has no results

### Edge Cases
- [ ] Handles activities with no elevation data
- [ ] Handles activities with no kudos/comments
- [ ] Handles long activity names gracefully

## 4. Best Times Component

### Initial Load
- [ ] Loading spinner displays while analyzing
- [ ] Best times calculate correctly
- [ ] Cards display for each distance

### Best Time Cards
- [ ] 1 Mile distance shows (if activity exists)
- [ ] 5K distance shows
- [ ] 10K distance shows
- [ ] 15K distance shows
- [ ] Half Marathon shows
- [ ] Marathon shows
- [ ] Distance badge is visible
- [ ] Time formatted correctly (HH:MM:SS)
- [ ] Pace displayed correctly (MM:SS /km)
- [ ] Date of activity shown
- [ ] Activity name displayed
- [ ] Hover effect works

### Empty State
- [ ] Shows appropriate message when no matching activities
- [ ] Encourages user to complete runs at standard distances

## 5. Responsive Design

### Desktop (1920x1080)
- [ ] Layout looks good
- [ ] All elements properly spaced
- [ ] Cards display in grid

### Laptop (1366x768)
- [ ] Layout adapts correctly
- [ ] No horizontal scrolling

### Tablet (768x1024)
- [ ] Cards stack appropriately
- [ ] Search box remains functional
- [ ] Tabs are touch-friendly

### Mobile (375x667)
- [ ] All content visible
- [ ] Buttons large enough for touch
- [ ] Text remains readable
- [ ] No overflow issues

## 6. Error Handling

### Network Errors
- [ ] Shows error when MCP server is down
- [ ] Shows error when token is invalid/expired
- [ ] Provides retry option
- [ ] Error messages are user-friendly

### Token Refresh
- [ ] Automatically refreshes expired tokens (if implemented)
- [ ] Handles refresh failures gracefully

### API Errors
- [ ] Handles 401 (unauthorized) errors
- [ ] Handles 429 (rate limit) errors
- [ ] Handles 500 (server) errors

## 7. Performance

### Load Times
- [ ] Initial page load is fast (<2 seconds)
- [ ] Activities load within 3 seconds
- [ ] Best times calculation completes within 5 seconds
- [ ] Tab switching is instantaneous

### User Experience
- [ ] No noticeable lag when typing in search
- [ ] Smooth scrolling through activities
- [ ] Smooth animations and transitions

## 8. Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## 9. Security

- [ ] Tokens stored securely in localStorage
- [ ] No sensitive data in console logs
- [ ] HTTPS used in production
- [ ] No credentials exposed in client code

## Notes

Use this checklist when testing the application. Mark items as complete when verified. Document any issues found with screenshots and console errors.

For issues found, create bug reports with:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Screenshots
5. Console errors (if any)
