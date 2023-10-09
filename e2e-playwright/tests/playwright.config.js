module.exports = {
  use: {
    // Example configuration for Chromium browser
    channel: 'chrome',
    headless: true, // Set to false for GUI mode during testing
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  },
};