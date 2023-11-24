import { Page } from 'playwright';

export default class NetworkPage {
  constructor(private readonly page: Page) {}
  readonly networkBanner = this.page.locator('banner-content').filter({hasText: "The World's Leading Payout Network"});

  getNetworBanner(){
    return this.networkBanner;
  }
}
