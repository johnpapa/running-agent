# PWA Icons for Running Agent

## Icon Requirements

The Running Agent PWA requires the following icon sizes:
- 72x72px
- 96x96px
- 128x128px
- 144x144px
- 152x152px
- 192x192px
- 384x384px
- 512x512px

## Design Guidelines

- **Theme Color**: #fc4c02 (Strava Orange)
- **Secondary Color**: #d84315 (Darker Orange)
- **Style**: Simple, recognizable running icon or logo
- **Format**: PNG with transparency
- **Purpose**: Both "any" and "maskable" (safe zones for maskable icons)

## How to Generate Icons

### Option 1: Use the Icon Generator (Recommended for Development)
1. Open `generate-icons.html` in a web browser
2. Right-click each canvas and "Save Image As..."
3. Save with the appropriate filename (e.g., `icon-192x192.png`)

### Option 2: Use a Design Tool
1. Create a design in Figma, Sketch, or Adobe Illustrator
2. Export at each required size
3. Ensure the design works at small sizes (72x72)
4. Consider maskable icon safe zones (icons should fit within 80% of the canvas)

### Option 3: Use an Online PWA Icon Generator
1. Visit https://www.pwabuilder.com/imageGenerator
2. Upload your base design (recommend 512x512 or larger)
3. Generate all sizes automatically
4. Download and replace the placeholder files

## Icon Content Suggestions

Consider using:
- 🏃 Runner silhouette/emoji
- Running shoe icon
- Stopwatch/timer icon
- "RA" monogram for Running Agent
- Combination of runner + chart/analytics icon

## Maskable Icons

For best results on Android and other platforms that support maskable icons:
- Keep important content within the center 80% of the canvas
- The outer 20% may be cropped into various shapes (circle, squircle, rounded square)
- Test with [Maskable.app](https://maskable.app/) editor

## Current Status

⚠️ **Placeholder icons are currently in use**

To use real icons:
1. Generate or design icons following the guidelines above
2. Replace the `.png.txt` placeholder files with actual PNG files
3. Ensure filenames match exactly (e.g., `icon-192x192.png`)
4. Rebuild the Angular app: `npm run build`

## Testing Icons

After adding real icons:
1. Build the app: `npm run build`
2. Serve the production build
3. Test PWA installation on:
   - Chrome/Edge (Desktop & Android)
   - Safari (iOS/iPadOS)
4. Verify icons appear correctly in:
   - Install prompt
   - Home screen
   - App switcher
   - Splash screen

## References

- [PWA Icon Guidelines](https://web.dev/add-manifest/#icons)
- [Maskable Icons](https://web.dev/maskable-icon/)
- [PWA Builder Icon Generator](https://www.pwabuilder.com/imageGenerator)
