import { test as base } from '@playwright/test';

export const test = base.extend<{ saveTraces: void }>({
  saveTraces: [async ({context}, use, testInfo) => {
    await context.tracing.start()
    // After the test we can check whether the test passed or failed.
    if (testInfo.status !== testInfo.expectedStatus) {
      await context.tracing.stop({path: testInfo.outputPath(`${testInfo.title}.zip`)})
      await context.close();
    }
  }, { auto: true }],
});
export { expect } from '@playwright/test';