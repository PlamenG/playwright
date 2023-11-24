import { test, expect } from '@playwright/test';
import HomePage from '../lib/pages/home-page';
import NetworkPage from '../lib/pages/network-page';

test.describe('HomePage Tests', () => {
  let homePage: HomePage;
  let networkPage: NetworkPage;

  test.beforeEach(({ page }) => {
    homePage = new HomePage(page);
    networkPage = new NetworkPage(page);
  });

  test("Open network from Home page", async ({}) => {
    await homePage.navigate()
    await homePage.openNetwork()
    expect(networkPage.getNetworBanner(), 'Network Page was NOT opened').toBeVisible();
  })
});
