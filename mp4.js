const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const http = require('http');
const fs = require('fs');

async function downloadMp4(url, outputPath) {
    const file = fs.createWriteStream(outputPath);

    return new Promise((resolve, reject) => {
        http.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve(outputPath));
            });
        }).on('error', error => {
            fs.unlink(outputPath);
            reject(error.message);
        });
    });
}

async function crawlAndDownload() {
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
        // Navigate to the webpage
        await driver.get('https://allsamplefiles.com/videos/mp4');

        // Find the download link element by its class
        const downloadLinkElement = await driver.findElement(By.css('.download-btn'));

        // Get the download link URL
        const downloadLinkUrl = await downloadLinkElement.getAttribute('href');

        // Download the mp4 file
        await downloadMp4(downloadLinkUrl, 'output.mp4');
        console.log('MP4 file downloaded successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Quit the WebDriver session
        await driver.quit();
    }
}

// Run the function
crawlAndDownload();
