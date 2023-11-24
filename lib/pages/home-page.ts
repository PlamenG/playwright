import { Page } from 'playwright';

export default class HomePage {
  constructor(private readonly page: Page) {}
  readonly seeOurNetworkButton = this.page.getByRole('button').filter({hasText: "SEE OUR NETWORK"});

  async navigate(){
    await this.page.goto('/', { waitUntil: "load"})
  }

  async openNetwork(){
    await this.seeOurNetworkButton.click();
  }
}
