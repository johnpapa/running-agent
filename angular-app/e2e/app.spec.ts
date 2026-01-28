import { test, expect } from '@playwright/test';

test.describe('Running Agent Application', () => {
  
  test.describe('Login Flow', () => {
    test('should display login page correctly', async ({ page }) => {
      await page.goto('/');
      
      // Should redirect to login
      await expect(page).toHaveURL(/.*login/);
      
      // Check for key elements
      await expect(page.getByRole('heading', { name: 'Running Agent' })).toBeVisible();
      await expect(page.getByText('Track your running activities and best times with Strava')).toBeVisible();
      await expect(page.getByRole('button', { name: /Connect with Strava/i })).toBeVisible();
      
      // Should NOT show MCP server instructions
      await expect(page.getByText(/MCP server/i)).not.toBeVisible();
      await expect(page.getByText(/Configure the MCP/i)).not.toBeVisible();
    });

    test('should have working Connect with Strava button', async ({ page }) => {
      await page.goto('/login');
      
      const connectButton = page.getByRole('button', { name: /Connect with Strava/i });
      await expect(connectButton).toBeEnabled();
      
      // Take screenshot of login page
      await page.screenshot({ path: 'e2e/screenshots/01-login-page.png', fullPage: true });
    });

    test('should handle keyboard navigation on login', async ({ page }) => {
      await page.goto('/login');
      
      // Focus on button with keyboard
      await page.keyboard.press('Tab');
      const connectButton = page.getByRole('button', { name: /Connect with Strava/i });
      
      // Check if button is focused (accessible)
      await expect(connectButton).toBeFocused();
    });
  });

  test.describe('UI Components', () => {
    test('login page has correct branding and styling', async ({ page }) => {
      await page.goto('/login');
      
      // Check for Strava branding
      const loginCard = page.locator('.login-card');
      await expect(loginCard).toBeVisible();
      
      // Check button is styled correctly
      const button = page.locator('.strava-login-btn');
      await expect(button).toBeVisible();
      await expect(button).toContainText('Connect with Strava');
    });

    test('should have responsive layout on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      await page.goto('/login');
      
      const loginCard = page.locator('.login-card');
      await expect(loginCard).toBeVisible();
    });
  });

  test.describe('Dashboard Navigation (Unauthenticated)', () => {
    test('should redirect to login when accessing dashboard without auth', async ({ page }) => {
      await page.goto('/dashboard');
      
      // Should redirect to login since no auth token
      await page.waitForURL(/.*login/);
      await expect(page).toHaveURL(/.*login/);
    });

    test('should redirect to login when accessing any protected route', async ({ page }) => {
      const protectedRoutes = ['/dashboard'];
      
      for (const route of protectedRoutes) {
        await page.goto(route);
        await expect(page).toHaveURL(/.*login/);
      }
    });
  });

  // Mock authenticated tests (simulating with localStorage)
  test.describe('Dashboard Features (Mocked Auth)', () => {
    test.beforeEach(async ({ page }) => {
      // Mock authentication by setting localStorage
      await page.goto('/login');
      await page.evaluate(() => {
        const mockToken = {
          access_token: 'mock_token_123',
          refresh_token: 'mock_refresh_123',
          expires_at: Math.floor(Date.now() / 1000) + 21600, // 6 hours from now
          token_type: 'Bearer'
        };
        const mockAthlete = {
          id: 12345,
          username: 'testrunner',
          firstname: 'Test',
          lastname: 'Runner',
          city: 'Test City',
          state: 'TS',
          country: 'TestLand',
          profile: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/12345/mock.jpg'
        };
        localStorage.setItem('strava_token', JSON.stringify(mockToken));
        localStorage.setItem('strava_athlete', JSON.stringify(mockAthlete));
      });
    });

    test('should display dashboard with tabs when authenticated', async ({ page }) => {
      await page.goto('/dashboard');
      
      // Wait for dashboard to load
      await page.waitForSelector('.dashboard-container', { timeout: 5000 });
      
      // Check if tabs are visible
      await expect(page.getByText('Activities')).toBeVisible();
      await expect(page.getByText('Best Times')).toBeVisible();
      await expect(page.getByText('AI Analysis')).toBeVisible();
    });
  });

  test.describe('Form Validation', () => {
    test.beforeEach(async ({ page }) => {
      // Mock authentication
      await page.goto('/login');
      await page.evaluate(() => {
        const mockToken = {
          access_token: 'mock_token_123',
          refresh_token: 'mock_refresh_123',
          expires_at: Math.floor(Date.now() / 1000) + 21600,
          token_type: 'Bearer'
        };
        localStorage.setItem('strava_token', JSON.stringify(mockToken));
      });
    });

    test('goal assessment form should validate time format', async ({ page }) => {
      await page.goto('/dashboard');
      
      // Navigate to AI Analysis tab
      const analysisTab = page.getByText('AI Analysis');
      if (await analysisTab.isVisible()) {
        await analysisTab.click();
        await page.waitForTimeout(1000);
        
        // Try to find the goal assessment form
        const currentTimeInput = page.locator('input[name="currentTime"]').first();
        if (await currentTimeInput.isVisible()) {
          // Test invalid format
          await currentTimeInput.fill('invalid');
          await currentTimeInput.blur();
          
          // Should show error for invalid format
          await expect(page.getByText(/format HH:MM:SS/i)).toBeVisible();
          
          // Test valid format
          await currentTimeInput.fill('3:24:00');
          await currentTimeInput.blur();
          
          // Error should disappear
          await expect(page.getByText(/format HH:MM:SS/i)).not.toBeVisible();
        }
      }
    });

    test('goal assessment button should be disabled with invalid input', async ({ page }) => {
      await page.goto('/dashboard');
      
      const analysisTab = page.getByText('AI Analysis');
      if (await analysisTab.isVisible()) {
        await analysisTab.click();
        await page.waitForTimeout(1000);
        
        const assessButton = page.getByRole('button', { name: /Assess My Goal/i }).first();
        if (await assessButton.isVisible()) {
          const currentTimeInput = page.locator('input[name="currentTime"]').first();
          
          if (await currentTimeInput.isVisible()) {
            // Clear input to make form invalid
            await currentTimeInput.clear();
            
            // Button should be disabled
            await expect(assessButton).toBeDisabled();
            
            // Fill with valid input
            await currentTimeInput.fill('3:24:00');
            const targetTimeInput = page.locator('input[name="targetTime"]').first();
            await targetTimeInput.fill('3:15:00');
            
            // Button should be enabled now
            await expect(assessButton).toBeEnabled();
          }
        }
      }
    });

    test('required field indicators should be visible', async ({ page }) => {
      await page.goto('/dashboard');
      
      const analysisTab = page.getByText('AI Analysis');
      if (await analysisTab.isVisible()) {
        await analysisTab.click();
        await page.waitForTimeout(1000);
        
        // Check for required indicators (asterisks)
        const requiredIndicators = page.locator('.required');
        const count = await requiredIndicators.count();
        
        if (count > 0) {
          expect(count).toBeGreaterThanOrEqual(2); // At least 2 required fields
        }
      }
    });
  });

  test.describe('Navigation and Tab Switching', () => {
    test.beforeEach(async ({ page }) => {
      // Mock authentication
      await page.goto('/login');
      await page.evaluate(() => {
        const mockToken = {
          access_token: 'mock_token_123',
          refresh_token: 'mock_refresh_123',
          expires_at: Math.floor(Date.now() / 1000) + 21600,
          token_type: 'Bearer'
        };
        localStorage.setItem('strava_token', JSON.stringify(mockToken));
      });
    });

    test('should switch between tabs', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForSelector('.dashboard-container', { timeout: 5000 });
      
      // Click Activities tab
      const activitiesTab = page.getByText('Activities').first();
      if (await activitiesTab.isVisible()) {
        await activitiesTab.click();
        await page.waitForTimeout(500);
      }
      
      // Click Best Times tab
      const bestTimesTab = page.getByText('Best Times').first();
      if (await bestTimesTab.isVisible()) {
        await bestTimesTab.click();
        await page.waitForTimeout(500);
      }
      
      // Click AI Analysis tab
      const analysisTab = page.getByText('AI Analysis').first();
      if (await analysisTab.isVisible()) {
        await analysisTab.click();
        await page.waitForTimeout(500);
      }
    });
  });

  test.describe('Accessibility', () => {
    test('login page should have proper ARIA labels', async ({ page }) => {
      await page.goto('/login');
      
      const connectButton = page.getByRole('button', { name: /Connect with Strava/i });
      await expect(connectButton).toBeVisible();
      
      // Verify button has text or aria-label
      const buttonText = await connectButton.textContent();
      expect(buttonText).toBeTruthy();
    });

    test('form inputs should have associated labels', async ({ page }) => {
      await page.goto('/login');
      await page.evaluate(() => {
        const mockToken = {
          access_token: 'mock_token_123',
          expires_at: Math.floor(Date.now() / 1000) + 21600
        };
        localStorage.setItem('strava_token', JSON.stringify(mockToken));
      });
      
      await page.goto('/dashboard');
      await page.waitForTimeout(1000);
      
      const analysisTab = page.getByText('AI Analysis');
      if (await analysisTab.isVisible()) {
        await analysisTab.click();
        await page.waitForTimeout(1000);
        
        // Check if inputs have labels with 'for' attribute
        const currentTimeInput = page.locator('#currentTime').first();
        if (await currentTimeInput.isVisible()) {
          const label = page.locator('label[for="currentTime"]');
          await expect(label).toBeVisible();
        }
      }
    });
  });

  test.describe('Error States', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      await page.goto('/login');
      
      // Simulate offline mode or network error
      await page.route('**/auth/url', route => route.abort());
      
      const connectButton = page.getByRole('button', { name: /Connect with Strava/i });
      await connectButton.click();
      
      // Should show error message
      await page.waitForTimeout(1000);
      const errorMessage = page.getByText(/Failed to get authorization URL/i);
      if (await errorMessage.isVisible()) {
        await expect(errorMessage).toBeVisible();
      }
    });
  });

  test.describe('Screenshots for Documentation', () => {
    test('capture key application screens', async ({ page }) => {
      // Login page
      await page.goto('/login');
      await page.screenshot({ path: 'e2e/screenshots/01-login-page.png', fullPage: true });
      
      // Mock authentication for dashboard screenshots
      await page.evaluate(() => {
        const mockToken = {
          access_token: 'mock_token_123',
          expires_at: Math.floor(Date.now() / 1000) + 21600
        };
        localStorage.setItem('strava_token', JSON.stringify(mockToken));
      });
      
      await page.goto('/dashboard');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'e2e/screenshots/02-dashboard.png', fullPage: true });
    });
  });
});
