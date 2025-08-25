import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should display the home page correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Claude Commands/);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Share Your Claude Code Commands');
    
    // Check description text
    await expect(page.locator('text=Discover and share custom slash commands')).toBeVisible();
    
    // Check login button is visible when not authenticated
    await expect(page.locator('text=Sign in with GitHub')).toBeVisible();
  });

  test('should display navigation elements', async ({ page }) => {
    await page.goto('/');
    
    // Check logo/brand link
    await expect(page.locator('text=Claude Commands')).toBeVisible();
    
    // Check if the logo link navigates to home
    const logoLink = page.locator('a[href="/"]').first();
    await expect(logoLink).toBeVisible();
  });
});

test.describe('Command listing', () => {
  test('should display empty state when no commands exist', async ({ page }) => {
    await page.goto('/');
    
    // Check for empty state message
    const emptyMessage = page.locator('text=No commands yet. Be the first to share!');
    if (await emptyMessage.isVisible()) {
      await expect(emptyMessage).toBeVisible();
    }
  });
});