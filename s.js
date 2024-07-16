const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function searchOnGoogle() {
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
        // Navigate to Google
        await driver.get('https://www.google.com');

        // Find the search input element and enter "motogp"
        await driver.findElement(By.name('q')).sendKeys('motogp', Key.RETURN);

        // Wait for search results to load
        await driver.wait(until.titleContains('motogp'), 10000);

        // Get the page title and print it
        const title = await driver.getTitle();
        console.log('Page title:', title);

        // Keep the browser open
        await new Promise(resolve => setTimeout(resolve, 300000)); // Adjust time as needed
    } catch (error) {
        console.error('An error occurred:', error);
    }
    // Do not quit the WebDriver session here
}

// Run the function
searchOnGoogle();
