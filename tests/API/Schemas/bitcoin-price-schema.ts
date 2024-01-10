import { z } from "zod"

const months = ["January","February","March","April","May","June","July","August","September","Oct","Nov","Dec"];
const d = new Date();
const month = months[d.getMonth()].substring(0,2)

const timeSchema = z.object({
    updated: z.string().startsWith(`${month}`).endsWith('UTC'),
    updatedISO: z.string().datetime({ offset: true }),
    updateduk: z.string().startsWith(`${month}`).endsWith('GMT'),
})

const currency = z.object({
    code: z.union([ z.string().includes('USD'), z.string().includes('EUR'), z.string().includes('GBP')]) ,
    symbol: z.union([ z.string().includes('&#36;'), z.string().includes('&pound;'), z.string().includes('&euro;')]),
    rate: z.string().min(9).max(12),
    description: z.string(),
    rate_float: z.number().positive().finite().safe(),
})

const bpi = z.object({
    USD: currency,
    GBP: currency,
    EUR: currency
})

const coindeskBtcPrice = z.object({
    time: timeSchema,
    disclaimer: z.string().startsWith('This data was produced from the CoinDesk Bitcoin Price Index (USD)').min(66),
    chartName: z.string().startsWith('Bitcoin').length(7),
    bpi: bpi
})

export const validateCoindeskBtcPriceSchema = (inputs: unknown) => {
    const isValidData = coindeskBtcPrice.safeParse(inputs);
    return isValidData;
};