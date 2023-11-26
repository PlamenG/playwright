import { test, expect } from '@playwright/test';
import HomePage from '../lib/pages/home-page';
import NetworkPage from '../lib/pages/network-page';

test.describe('HomePage Tests', () => {
  let homePage: HomePage;
  let networkPage: NetworkPage;

  test("Open network from Home page", async ({page}) => {
    homePage = new HomePage(page);
    networkPage = new NetworkPage(page);
    await homePage.navigate()
    await homePage.clickAcceptCookies();
    await homePage.clickOpenNetwork()
    expect(networkPage.getNetworBanner('The World\'s Leading Payout'), 'Network Page was NOT opened').toBeVisible();
  })
});
