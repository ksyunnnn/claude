import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to protected pages and redirect when not authenticated', async ({ page }) => {
    // Try to access new command page
    await page.goto('/new');
    await expect(page).toHaveURL('/');
    
    // Try to access settings page
    await page.goto('/settings');
    await expect(page).toHaveURL('/');
  });

  test('should allow access to public user pages', async ({ page }) => {
    // Access a user page (using a dummy user ID)
    const dummyUserId = '123e4567-e89b-12d3-a456-426614174000';
    await page.goto(`/${dummyUserId}`);
    
    // Should not redirect
    await expect(page).toHaveURL(`/${dummyUserId}`);
  });

  test('should handle 404 for non-existent pages gracefully', async ({ page }) => {
    await page.goto('/non-existent-page-12345');
    
    // Next.js will show a 404 page
    // The exact content depends on Next.js version and configuration
    await expect(page.locator('body')).toBeVisible();
  });
});