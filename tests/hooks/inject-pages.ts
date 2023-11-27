import { test as base } from '@playwright/test';
import HomePage from '../../lib/pages/home-page';
import NetworkPage from '../../lib/pages/network-page';

type PageObjects = {
  homePage: HomePage;
  networkPage: NetworkPage;
};

export const test = base.extend<PageObjects>({
    homePage: async ({ page }, use) => {await use(await new HomePage(page))},
    networkPage: async ({ page }, use) => {await use(await new NetworkPage(page))},
})
export { expect } from '@playwright/test';