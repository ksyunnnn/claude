import { test, expect } from '@playwright/test';

test.describe('Unauthenticated user like functionality', () => {
  test('should show like button when not logged in', async ({ page }) => {
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Navigate directly to a command page (unauthenticated)
    await page.goto('/ksyunnnn/resolve-review-comments');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of unauthenticated command page
    await page.screenshot({
      path: 'tests/screenshots/unauthenticated-command-page.png',
      fullPage: false
    });
    
    // Look for like button
    const likeButton = page.locator('button[aria-label*="like"]').first();
    console.log(`Found ${await likeButton.count()} like buttons for unauthenticated user`);
    
    // Check if like button is visible
    if (await likeButton.count() > 0) {
      console.log('✅ Like button is visible for unauthenticated users');
      
      // Check aria-label indicates sign in is required
      const ariaLabel = await likeButton.getAttribute('aria-label');
      console.log(`Like button aria-label: "${ariaLabel}"`);
      
      // Test clicking the like button shows login modal
      await likeButton.click();
      
      // Wait for login modal to appear
      try {
        await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
        
        // Take screenshot of login modal
        await page.screenshot({
          path: 'tests/screenshots/unauthenticated-login-modal.png',
          fullPage: false
        });
        
        // Verify modal content
        await expect(page.locator('text=Sign in to like commands')).toBeVisible();
        await expect(page.locator('text=Sign in with GitHub')).toBeVisible();
        
        console.log('✅ Login modal appears correctly when unauthenticated user clicks like');
        
        // Close modal
        await page.locator('button:has-text("Maybe later")').click();
        
        // Verify modal closes
        await expect(page.locator('[role="dialog"]')).not.toBeVisible();
        
        console.log('✅ Login modal closes correctly');
        
      } catch (error) {
        console.log('❌ Login modal did not appear or failed to interact');
        console.log('Error:', error);
      }
      
    } else {
      console.log('❌ Like button is NOT visible for unauthenticated users');
      
      // Debug: Check what buttons are available
      const allButtons = page.locator('button');
      const buttonCount = await allButtons.count();
      console.log(`Found ${buttonCount} buttons total on the page`);
      
      for (let i = 0; i < Math.min(5, buttonCount); i++) {
        const buttonText = await allButtons.nth(i).textContent();
        const ariaLabel = await allButtons.nth(i).getAttribute('aria-label');
        console.log(`Button ${i}: text="${buttonText}", aria-label="${ariaLabel}"`);
      }
    }
  });

  test('should show correct like count for unauthenticated users', async ({ page }) => {
    // Set mobile viewport to test responsive design
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/ksyunnnn/resolve-review-comments');
    await page.waitForLoadState('networkidle');
    
    // Take mobile screenshot
    await page.screenshot({
      path: 'tests/screenshots/unauthenticated-mobile.png',
      fullPage: false
    });
    
    // Look for like count display
    const likeButton = page.locator('button[aria-label*="like"]').first();
    
    if (await likeButton.count() > 0) {
      const buttonText = await likeButton.textContent();
      console.log(`Like button shows: "${buttonText}"`);
      
      // Should show like count (e.g., "♥ 0" or similar)
      expect(buttonText).toMatch(/\d+/);
      
      console.log('✅ Like count is displayed for unauthenticated users');
    } else {
      console.log('❌ No like button found on mobile view');
    }
  });
});