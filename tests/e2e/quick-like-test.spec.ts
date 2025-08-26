import { test } from '@playwright/test';

test('Quick like button test', async ({ page }) => {
  // Set viewport for consistent screenshots
  await page.setViewportSize({ width: 1280, height: 720 });
  
  // Navigate to command page
  await page.goto('/ksyunnnn/resolve-review-comments', { waitUntil: 'networkidle' });
  
  // Wait a bit more to ensure all components load
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({
    path: 'tests/screenshots/latest-command-page.png',
    fullPage: false
  });
  
  // Debug: Print page content
  const pageContent = await page.content();
  console.log('Page HTML contains like?', pageContent.includes('like') || pageContent.includes('heart') || pageContent.includes('♥'));
  
  // Look for any button with like-related attributes
  const allButtons = await page.locator('button').all();
  console.log(`Found ${allButtons.length} buttons total`);
  
  for (let i = 0; i < allButtons.length; i++) {
    const button = allButtons[i];
    const text = await button.textContent();
    const ariaLabel = await button.getAttribute('aria-label');
    const className = await button.getAttribute('class');
    console.log(`Button ${i}: text="${text}", aria-label="${ariaLabel}", class="${className}"`);
  }
  
  // Look for heart icons specifically
  const heartIcons = await page.locator('svg, [data-lucide="heart"]').all();
  console.log(`Found ${heartIcons.length} heart icons`);
});