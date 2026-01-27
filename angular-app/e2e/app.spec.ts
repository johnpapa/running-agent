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
  });

  test.describe('Dashboard Navigation (Unauthenticated)', () => {
    test('should redirect to login when accessing dashboard without auth', async ({ page }) => {
      await page.goto('/dashboard');
      
      // Should redirect to login since no auth token
      await page.waitForURL(/.*login/);
      await expect(page).toHaveURL(/.*login/);
    });
  });
});
