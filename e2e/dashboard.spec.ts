import { test, expect } from '@playwright/test';

test.describe('Health OS Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Go to login page
    await page.goto('/');
    
    // Login with demo credentials
    await page.fill('input[placeholder="demo@healthcare.com"]', 'demo@healthcare.com');
    await page.fill('input[type="password"]', 'Demo@1234');
    await page.click('button:has-text("AUTHENTICATE")');
    
    // Wait for dashboard to load
    await expect(page).toHaveURL('/dashboard');
  });

  test('visual regression - dashboard', async ({ page }) => {
    // Wait for animations/charts to settle
    await page.waitForTimeout(2000);
    
    // Check visual snapshot
    await expect(page).toHaveScreenshot('dashboard.png', {
      maxDiffPixelRatio: 0.05,
      fullPage: true,
    });
  });

  test('navigation works', async ({ page }) => {
    // Navigate to Analytics
    await page.click('a:has-text("ANALYTICS")');
    await expect(page).toHaveURL('/analytics');
    await expect(page.locator('.mono-label')).toContainText('ANALYTICS_ENGINE');

    // Navigate to Patients
    await page.click('a:has-text("PATIENTS")');
    await expect(page).toHaveURL('/patients');
    await expect(page.locator('.mono-label')).toContainText('PATIENT_DATABASE');
  });

  test('notification workflow', async ({ page }) => {
    // Click on notification bell
    await page.click('button:has-text("0")'); // Assuming 0 unread initially
    
    // Simulate a critical alert
    await page.click('button:has-text("TRIGGER_TEST_ALERT")');
    
    // Check if notification appears in panel
    await expect(page.locator('.NotificationPanel')).toBeVisible();
    await expect(page.locator('button:has-text("Notifications (1)")')).toBeVisible();
  });
});
