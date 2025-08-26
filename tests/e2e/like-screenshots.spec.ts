import { test, expect } from '@playwright/test';

test.describe('Like functionality screenshots', () => {
  test('should capture like button states', async ({ page }) => {
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1280, height: 720 });
    
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of the home page
    await page.screenshot({
      path: 'tests/screenshots/like-buttons-home.png',
      fullPage: false
    });
    
    // Try navigating directly to a command page since links might not work
    await page.goto('/ksyunnnn/resolve-review-comments');
    
    // Wait for command page to load or check if 404
    try {
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      
      // Check if we're on a 404 page
      const notFoundText = page.locator('text=This page could not be found');
      const is404 = await notFoundText.count() > 0;
      
      if (is404) {
        console.log('Command page not found, trying different URL');
        // Try the first command from the homepage
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        
        // Get the first command link
        const commandLink = page.locator('a[href^="/"][href*="/"]').first();
        const href = await commandLink.getAttribute('href');
        console.log('Found command link:', href);
        
        if (href && href.length > 1) {
          await page.goto(href);
          await page.waitForLoadState('networkidle');
        }
      }
      
      // Take screenshot of command page with like button
      await page.screenshot({
        path: 'tests/screenshots/command-page-with-like-button.png',
        fullPage: false
      });
      
      // Look for like button
      const likeButton = page.locator('button[aria-label*="like"]').first();
      console.log(`Found ${await likeButton.count()} like buttons`);
      
      if (await likeButton.count() > 0) {
        console.log('Like button found! Testing login modal');
        
        // Test login modal by clicking like button
        await likeButton.click();
        
        // Wait for modal to appear
        await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
        
        // Take screenshot of login modal
        await page.screenshot({
          path: 'tests/screenshots/login-prompt-modal.png',
          fullPage: false
        });
        
        // Close modal
        await page.locator('button:has-text("Maybe later")').click();
      } else {
        console.log('No like button found on command page');
        // Check what buttons exist
        const allButtons = page.locator('button');
        const buttonCount = await allButtons.count();
        console.log(`Found ${buttonCount} buttons total`);
        
        for (let i = 0; i < Math.min(3, buttonCount); i++) {
          const buttonText = await allButtons.nth(i).textContent();
          const ariaLabel = await allButtons.nth(i).getAttribute('aria-label');
          console.log(`Button ${i}: text="${buttonText}", aria-label="${ariaLabel}"`);
        }
      }
      
    } catch (error) {
      console.log('Error navigating to command page:', error);
      await page.screenshot({
        path: 'tests/screenshots/command-page-error.png',
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
    
    // Take screenshot of mobile home view
    await page.screenshot({
      path: 'tests/screenshots/like-buttons-mobile.png',
      fullPage: false
    });
    
    // Navigate to a command page for mobile like button test
    // Find any command link on the mobile page
    const mobileCommandLinks = page.locator('a[href*="/"]').filter({ hasText: /create-slash-commands\.com|resolve-review-comments|fixit-pr|refine-it/ });
    
    if (await mobileCommandLinks.count() > 0) {
      const firstMobileLink = mobileCommandLinks.first();
      const linkHref = await firstMobileLink.getAttribute('href');
      console.log('Mobile: Clicking on command link:', linkHref);
      
      await firstMobileLink.click();
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      // Take screenshot of mobile command page
      await page.screenshot({
        path: 'tests/screenshots/command-page-mobile.png',
        fullPage: false
      });
      
      // Test mobile modal if like button exists
      const likeButton = page.locator('button[aria-label*="like"]').first();
      
      if (await likeButton.count() > 0) {
        await likeButton.click();
        
        await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
        
        // Take screenshot of mobile login modal
        await page.screenshot({
          path: 'tests/screenshots/login-modal-mobile.png',
          fullPage: false
        });
      }
    } else {
      console.log('Mobile: No command links found');
      
      // Take screenshot showing mobile page without command links
      await page.screenshot({
        path: 'tests/screenshots/mobile-no-command-links.png',
        fullPage: false
      });
    }
  });
});