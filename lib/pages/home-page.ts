import { Page } from 'playwright';

export default class HomePage {
  constructor(private readonly page: Page) {}
  readonly seeOurNetworkButton = this.page.getByRole('link', { name: 'READ ABOUT OUR NETWORK' });
  readonly acceptAllCookiesButton = this.page.locator('#hs-eu-confirmation-button');

  async navigate(){
    await this.page.goto('/', { waitUntil: "load"})
  }

  async clickOpenNetwork(){
    await this.seeOurNetworkButton.click();
  }

  async clickAcceptCookies(){
    await this.acceptAllCookiesButton.click();
  }
}
