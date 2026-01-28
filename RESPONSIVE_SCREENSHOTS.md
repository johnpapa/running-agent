# Running Agent - Responsive UI Screenshots

This document provides a comprehensive visual guide to the Running Agent application's responsive design across mobile (iPhone) and desktop devices.

## Overview

All application screens have been optimized for responsive display on:
- **Mobile**: iPhone (390x844px) - Touch-optimized interface
- **Desktop**: Desktop browser (1920x1080px) - Full-featured interface

---

## 1. Login Page

### iPhone View (390x844px)
![Login iPhone](https://github.com/user-attachments/assets/923cfa98-8fc6-4953-8131-6d9feb895055)

**Mobile Optimizations:**
- Centered login card
- Large touch-friendly "Connect with Strava" button
- Simplified layout for small screens
- Full-width button design

### Desktop View (1920x1080px)
![Login Desktop](https://github.com/user-attachments/assets/c4789e8c-9605-44e6-87f7-2128ace0d7a7)

**Desktop Features:**
- Centered card with gradient background
- Hover effects on button
- Optimal spacing for large screens

---

## 2. Activities Dashboard

### iPhone View (390x844px)
![Activities iPhone](https://github.com/user-attachments/assets/0c50098e-38d0-4ffd-83df-142e889e320e)

**Mobile Optimizations:**
- Vertical tab navigation
- Full-width activity cards
- Touch-optimized search bar
- Single-column layout
- Streamlined header (user name hidden)

### Desktop View (1920x1080px)
![Activities Desktop](https://github.com/user-attachments/assets/21b095d0-7de0-4579-8f2e-94136ba75ce7)

**Desktop Features:**
- Horizontal tab navigation
- Full user profile display
- Hover effects on activity cards
- Efficient use of screen space
- Multi-column information layout

---

## 3. Best Times Dashboard

### iPhone View (390x844px)
![Best Times iPhone](https://github.com/user-attachments/assets/1115b2f8-9bc7-412f-882d-f5baaa1e56af)

**Mobile Optimizations:**
- Vertical stacking of PR cards
- Full-width distance cards
- Touch-friendly spacing
- Single-column layout

### Desktop View (1920x1080px)
![Best Times Desktop](https://github.com/user-attachments/assets/bfc9d158-ec81-49c9-a77e-f7548c873f2d)

**Desktop Features:**
- Three-column grid layout
- Hover effects on cards
- Efficient information density
- Professional card design

---

## 4. AI Analysis Dashboard

### iPhone View (390x844px)
![AI Analysis iPhone](https://github.com/user-attachments/assets/a3346f32-6787-4aa8-814c-211c1df488e1)

**Mobile Optimizations:**
- Vertical form layout
- Full-width input fields
- Touch-optimized buttons
- Scrollable content sections
- Stacked training recommendations

### Desktop View (1920x1080px)
![AI Analysis Desktop](https://github.com/user-attachments/assets/ed78db37-59fc-431c-aff1-604acc26bf5c)

**Desktop Features:**
- Side-by-side form inputs
- Wider content area
- Optimized reading width
- Enhanced spacing
- Multi-column workout analysis

---

## Responsive Design Features

### Breakpoints
```scss
$mobile-small: 320px;
$mobile: 428px;
$tablet: 768px;
$laptop: 1366px;
$desktop: 1920px;
```

### Mobile (390px - iPhone)
- Touch targets ≥ 44px
- Vertical navigation
- Single-column layouts
- Full-width cards
- Simplified headers
- Streamlined information

### Desktop (1920px)
- Mouse-optimized interactions
- Multi-column grids
- Hover effects
- Enhanced spacing
- Full information display
- Professional UI density

---

## Testing

All screenshots captured using:
- **Tool**: Playwright MCP server
- **iPhone**: 390x844px viewport
- **Desktop**: 1920x1080px viewport
- **Capture**: Full page screenshots

### Test Command
```bash
npm run test:e2e
```

### Screenshot Generation
Screenshots are generated using Playwright and stored in `/screenshots/` directory.

---

## Usage Guidelines

### For Developers
1. Always test responsive design on both mobile and desktop
2. Use browser dev tools to simulate different devices
3. Verify touch targets are ≥ 44px on mobile
4. Ensure proper spacing and readability

### For QA/Testing
1. Test on actual iPhone devices when possible
2. Verify all features work on both viewports
3. Check scroll behavior and navigation
4. Validate form inputs on touch devices

---

## Future Enhancements

Planned responsive improvements:
- Tablet-specific layouts (768px-1024px)
- Landscape mode optimizations
- Foldable device support
- Enhanced accessibility features

---

**Last Updated**: January 28, 2026  
**Screenshots Generated**: Playwright MCP Server  
**Viewport Specifications**: iPhone 390x844px, Desktop 1920x1080px
