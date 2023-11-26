import { Page } from 'playwright';

export default class NetworkPage {
  constructor(private readonly page: Page) {}
  readonly networkBanner = (headingTitle:string) => this.page.getByRole('heading', { name: headingTitle });

  getNetworBanner(title:string){
    return this.networkBanner(title);
  }
}
