import { test, expect } from '@playwright/test';

test.describe('Like functionality screenshots', () => {
  test('should capture like button states', async ({ page }) => {
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1280, height: 720 });
    
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of the home page with like buttons
    await page.screenshot({
      path: 'tests/screenshots/like-buttons-home.png',
      fullPage: false
    });
    
    // Look for like buttons on the page
    const likeButtons = page.locator('button').filter({ hasText: /^\s*♥\s*\d+\s*$/ });
    
    if (await likeButtons.count() > 0) {
      // Take a focused screenshot of the first like button area
      const firstLikeButton = likeButtons.first();
      const commandContainer = firstLikeButton.locator('..').locator('..');
      
      await commandContainer.screenshot({
        path: 'tests/screenshots/like-button-detail.png'
      });
      
      // Test login modal by clicking like button
      await firstLikeButton.click();
      
      // Wait for modal to appear
      await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
      
      // Take screenshot of login modal
      await page.screenshot({
        path: 'tests/screenshots/login-prompt-modal.png',
        fullPage: false
      });
      
      // Close modal
      await page.locator('button:has-text("Maybe later")').click();
    }
    
    // Look for liked users modal triggers (like count buttons)
    const likeCountButtons = page.locator('button').filter({ hasText: /\d+\s+like/ });
    
    if (await likeCountButtons.count() > 0) {
      // Click to open liked users modal
      await likeCountButtons.first().click();
      
      // Wait for modal to appear
      await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
      
      // Take screenshot of liked users modal
      await page.screenshot({
        path: 'tests/screenshots/liked-users-modal.png',
        fullPage: false
      });
    }
  });

  test('should capture mobile view of like functionality', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of mobile view
    await page.screenshot({
      path: 'tests/screenshots/like-buttons-mobile.png',
      fullPage: false
    });
    
    // Test mobile modal if like buttons exist
    const likeButtons = page.locator('button').filter({ hasText: /^\s*♥\s*\d+\s*$/ });
    
    if (await likeButtons.count() > 0) {
      await likeButtons.first().click();
      
      await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
      
      // Take screenshot of mobile login modal
      await page.screenshot({
        path: 'tests/screenshots/login-modal-mobile.png',
        fullPage: false
      });
    }
  });
});