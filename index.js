const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
    const browser = await puppeteer.launch({
        headless: true, // Must be headless on Render
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 }); // Set screen size to wide

    const recorderOptions = {
        fps: 60, // Increase FPS for smoother recording
        videoFrame: {
            width: 1920,
            height: 1080,
        },
        videoCodec: 'libx264', // Better compression
        outputFormat: 'mp4',
    };

    const recorder = new PuppeteerScreenRecorder(page, recorderOptions);
    await recorder.start('./sample---site.mp4');

    // Navigate to the site
    await page.goto('https://sample-site-zeta.vercel.app/', { waitUntil: 'load', timeout: 60000 });
    console.log("Recording page now")
    // Wait for 20 seconds to record the page
    await page.waitForTimeout(60000);

    // Stop recording
    await recorder.stop();

    console.log('Recording completed and saved as code_recording.mp4');
    await browser.close();
})();
