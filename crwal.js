const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function scrollSmoothly() {
    // Set up Chrome options
    const chromeOptions = new chrome.Options();
    // Uncomment the line below if you want to run Chrome in headless mode
    // chromeOptions.addArguments('--headless');

    // Set up the WebDriver
    const driver = await new Builder()
        .forBrowser('chrome') // Use Chrome
        .setChromeOptions(chromeOptions)
        .build();

    try {
        // Navigate to Cloudflare Community
        await driver.get('https://pages.zxc.co.in/');

        // Scroll down smoothly
        await driver.executeScript('window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });');

        // Wait for a moment
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Scroll up smoothly
        await driver.executeScript('window.scrollTo({ top: 0, behavior: "smooth" });');

        // Wait for a moment
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Scroll down smoothly again
        await driver.executeScript('window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });');

        // Wait for a moment
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Scroll up smoothly again
        await driver.executeScript('window.scrollTo({ top: 0, behavior: "smooth" });');

        // Wait for a moment
        await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Quit the WebDriver session
        await driver.quit();
    }
}

// Run the function
scrollSmoothly();
