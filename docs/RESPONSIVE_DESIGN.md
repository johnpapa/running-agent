# Responsive Design Guide

## Overview

Running Agent implements a mobile-first, responsive design that provides an optimal experience across all device sizes, from small smartphones to large desktop monitors.

## Breakpoints

### Device Categories

| Category | Range | Typical Devices | Layout Strategy |
|----------|-------|----------------|-----------------|
| **Mobile** | 320px - 428px | iPhone SE, iPhone 14, Android phones | Stacked, single column |
| **Tablet** | 768px - 1024px | iPad, iPad Pro, Android tablets | 2-column grid, larger touch targets |
| **Laptop** | 1366px - 1920px | MacBook, laptops, smaller monitors | Multi-column, standard spacing |
| **Desktop** | 1920px+ | Large monitors, 4K displays | Max-width containers, optimal line length |

### SCSS Breakpoint Variables

```scss
// Breakpoints (mobile-first)
$mobile: 480px;
$tablet: 768px;
$laptop: 1024px;
$desktop: 1366px;
$wide: 1920px;

// Usage example
.component {
  padding: 16px;
  
  @media (min-width: $tablet) {
    padding: 24px;
  }
  
  @media (min-width: $laptop) {
    padding: 32px;
  }
}
```

## Design Principles

### 1. Mobile-First Approach
Start with mobile styles and progressively enhance for larger screens:

```scss
// ✅ Good - Mobile first
.card {
  padding: 12px;
  font-size: 14px;
  
  @media (min-width: 768px) {
    padding: 20px;
    font-size: 16px;
  }
}

// ❌ Bad - Desktop first
.card {
  padding: 20px;
  font-size: 16px;
  
  @media (max-width: 767px) {
    padding: 12px;
    font-size: 14px;
  }
}
```

### 2. Touch-Friendly Targets
All interactive elements must be easily tappable:

- **Minimum size**: 44px × 44px (iOS guidelines)
- **Recommended**: 48px × 48px (Material Design)
- **Spacing**: Minimum 8px between tap targets

```scss
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
  
  @media (min-width: 768px) {
    min-height: 48px;
    padding: 14px 28px;
  }
}
```

### 3. Flexible Layouts
Use CSS Grid and Flexbox for responsive layouts:

```scss
// Grid with auto-fit
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

// Flexbox for navigation
.nav {
  display: flex;
  gap: 8px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
}
```

### 4. Readable Typography
Optimize text size and line length for each device:

```scss
.content {
  font-size: 14px;
  line-height: 1.6;
  max-width: 100%;
  
  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 1.7;
    max-width: 65ch; // Optimal reading width
  }
}
```

## Component Patterns

### Navigation Bar

**Mobile**: Compact, hide user name, smaller icons
**Tablet/Desktop**: Full user info, larger spacing

```scss
.navbar {
  padding: 12px;
  
  .user-name {
    display: none; // Hide on mobile
  }
  
  @media (min-width: 768px) {
    padding: 16px 20px;
    
    .user-name {
      display: block;
    }
  }
}
```

### Tabs/Navigation

**Mobile**: Vertical stack or horizontal scroll
**Desktop**: Horizontal layout with flex

```scss
.tabs {
  display: flex;
  gap: 4px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
}
```

### Activity Cards

**Mobile**: Full-width, stacked stats
**Tablet**: 2-column stats grid
**Desktop**: Multi-column stats

```scss
.activity-card {
  padding: 12px;
  
  .stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
    }
  }
  
  @media (min-width: 768px) {
    padding: 20px;
  }
}
```

### Forms

**Mobile**: Full-width inputs, vertical layout
**Desktop**: Multi-column layout

```scss
.form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr auto;
    gap: 16px;
    align-items: end;
  }
  
  input {
    width: 100%;
    min-height: 44px;
    font-size: 16px; // Prevent iOS zoom
    
    @media (min-width: 768px) {
      font-size: 14px;
    }
  }
}
```

## Testing Strategy

### Device Testing Checklist

#### Mobile (320px - 428px)
- [ ] iPhone SE (375×667)
- [ ] iPhone 14 (390×844)
- [ ] iPhone 14 Pro Max (428×926)
- [ ] Android phones (360×800)

**Test Points:**
- Text is readable without zooming
- Touch targets are easily tappable
- No horizontal scrolling
- Content fits viewport
- Navigation is accessible

#### Tablet (768px - 1024px)
- [ ] iPad (768×1024)
- [ ] iPad Pro 11" (834×1194)
- [ ] iPad Pro 12.9" (1024×1366)
- [ ] Android tablets (800×1280)

**Test Points:**
- Optimal use of screen space
- Two-column layouts work well
- Images and cards scale properly
- Touch targets remain large enough

#### Desktop (1024px+)
- [ ] Laptop (1366×768)
- [ ] Desktop (1920×1080)
- [ ] 4K (3840×2160)

**Test Points:**
- Multi-column layouts
- Content doesn't stretch too wide
- Mouse hover states work
- Keyboard navigation functional

### Browser DevTools Testing

#### Chrome DevTools
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select device or enter custom dimensions
4. Test responsive breakpoints
5. Throttle network to test performance

#### Responsive Design Mode (Firefox)
1. Open DevTools (F12)
2. Click responsive design mode icon
3. Test various device presets
4. Rotate device orientation
5. Test touch simulation

### Real Device Testing

**Priority devices to test:**
1. iPhone 14 (iOS Safari)
2. Samsung Galaxy S23 (Chrome)
3. iPad Pro (Safari)
4. Desktop Chrome (1920×1080)
5. Desktop Firefox (1366×768)

## Common Patterns

### Container Max-Width

```scss
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 12px;
  }
}
```

### Responsive Grid

```scss
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}
```

### Image Optimization

```scss
img {
  max-width: 100%;
  height: auto;
  display: block;
}

.hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 250px;
  }
}
```

### Responsive Tables

```scss
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: 768px) {
    table {
      font-size: 14px;
    }
    
    th, td {
      padding: 8px 4px;
    }
  }
}
```

## Accessibility Considerations

### Font Sizes
- **Base font**: 16px minimum on mobile (prevents iOS zoom)
- **Body text**: 14-16px on mobile, 16-18px on desktop
- **Headings**: Scale proportionally

### Color Contrast
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text (18pt+)
- Test with Chrome DevTools accessibility panel

### Focus States
```scss
button:focus-visible {
  outline: 2px solid #fc4c02;
  outline-offset: 2px;
}
```

### Touch vs. Mouse
```scss
// Larger tap targets on touch devices
@media (hover: none) and (pointer: coarse) {
  .button {
    min-height: 48px;
    padding: 14px 24px;
  }
}

// Hover effects only for mouse users
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    transform: translateY(-2px);
  }
}
```

## Performance Tips

### 1. Lazy Load Images
```html
<img loading="lazy" src="activity.jpg" alt="Activity">
```

### 2. Use Modern Image Formats
```html
<picture>
  <source srcset="activity.webp" type="image/webp">
  <source srcset="activity.jpg" type="image/jpeg">
  <img src="activity.jpg" alt="Activity">
</picture>
```

### 3. Minimize Reflows
- Use `transform` instead of `top/left`
- Use `opacity` instead of `visibility`
- Batch DOM updates
- Use `will-change` sparingly

### 4. Critical CSS
- Inline critical above-the-fold CSS
- Defer non-critical CSS
- Use CSS containment

## Tools & Resources

### Testing Tools
- **Chrome DevTools**: Built-in responsive testing
- **BrowserStack**: Real device testing
- **Responsively App**: Desktop app for responsive testing
- **Mobile DevTools**: Remote debugging on real devices

### Design Resources
- [Material Design Breakpoints](https://material.io/design/layout/responsive-layout-grid.html)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Bootstrap Breakpoints](https://getbootstrap.com/docs/5.0/layout/breakpoints/)

### Validation
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## Troubleshooting

### Issue: Text too small on mobile
**Solution**: Ensure base font size is at least 16px

### Issue: Horizontal scrolling
**Solution**: Add `overflow-x: hidden` to body, check for fixed-width elements

### Issue: Touch targets too small
**Solution**: Increase min-height to 44px, add padding

### Issue: Layout breaks at specific width
**Solution**: Add intermediate breakpoint, test with DevTools

---

**Last Updated**: January 2026
**Maintainers**: Running Agent Team
