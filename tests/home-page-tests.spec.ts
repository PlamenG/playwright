import { test, expect } from './hooks/inject-pages';

test.describe('HomePage Tests', () => {
  // let homePage: HomePage;
  // let networkPage: NetworkPage;

  test("Open Network Page from Home page", async ({homePage, networkPage}) => {
    // homePage = new HomePage(page);
    // networkPage = new NetworkPage(page);
    await homePage.navigate()
    await homePage.clickAcceptCookies();
    await homePage.clickOpenNetwork()
    expect(networkPage.getNetworBanner('The World\'s Leading Payout'), 'Network Page was NOT opened').toBeVisible();
  })
});
