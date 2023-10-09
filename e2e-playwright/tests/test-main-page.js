const { chromium } = require('playwright');

describe('Main Page', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
      await page.goto('http://localhost:7777');
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should display the main page with correct title', async () => {
    const title = await page.title();
    expect(title).toBe('Shared shopping lists');
  });

  it('should display shopping list statistics', async () => {
    const statistics = await page.textContent('.statistics');
    expect(statistics).toContain('Shopping lists:');
    expect(statistics).toContain('Shopping list items:');
  });
});
