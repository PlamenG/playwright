import { test, expect } from '@playwright/test';
import { validateCoindeskBtcPriceSchema } from './Schemas/bitcoin-price-schema';

const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

test.describe('API tests', () => {

    test("just test", async ( { request } ) => {
        const coindesk = await request.get(url)
        const response = await coindesk.json()
        expect(coindesk.ok()).toBeTruthy();
        const schemaValidation = validateCoindeskBtcPriceSchema(response)
        expect(schemaValidation.success, `Schema validation errors are: \n ${schemaValidation.error}`).toBeTruthy();
    })
});