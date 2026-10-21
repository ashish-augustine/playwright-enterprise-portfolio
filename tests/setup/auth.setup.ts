import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { env } from '../../src/config/env.config';
import fs from 'fs';
import path from 'path';

const authFile = path.resolve(process.cwd(), '.auth/standard_user.json');

setup('authenticate as standard_user', async ({ page }) => {
  // Ensure .auth directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('/');
  await loginPage.login(env.users.standard, env.PASSWORD);

  // Verify successful login redirect to inventory
  await expect(page).toHaveURL(/.*inventory\.html/);

  // Save signed-in state (cookies, localStorage)
  await page.context().storageState({ path: authFile });
});
