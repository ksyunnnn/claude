import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login button when not authenticated', async ({ page }) => {
    await page.goto('/');
    
    const loginButton = page.locator('button:has-text("Sign in with GitHub")');
    await expect(loginButton).toBeVisible();
    
    // Check GitHub icon is present
    const githubIcon = page.locator('svg').first();
    await expect(githubIcon).toBeVisible();
  });

  test('login button should have correct structure', async ({ page }) => {
    await page.goto('/');
    
    const loginButton = page.locator('button:has-text("Sign in with GitHub")');
    
    // Button should be clickable
    await expect(loginButton).toBeEnabled();
    
    // Button should have outline variant styling
    await expect(loginButton).toHaveClass(/outline/);
  });
});

test.describe('Protected routes', () => {
  test('should redirect to home when accessing protected routes without auth', async ({ page }) => {
    const protectedRoutes = ['/new', '/settings'];
    
    for (const route of protectedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL('/');
    }
  });
});