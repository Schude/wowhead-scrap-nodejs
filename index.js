const puppeteer = require("puppeteer");

const url = "https://www.wowhead.com/items/trade-goods?filter=166;2;0#150";

async function main(url) {
  try {
    console.log("*****************\n*************************");
    const browser = await puppeteer.launch({ headless: false }); //shows what it is doing
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url, {waitUntil: 'load', timeout: 0});
    const links = await page.$$eval(".listview-cleartext ", (url) =>
      url.map((link) => link.href)
    );

    for (i = 0; i < links.length; i++) {
      const id = links[i].split("/")[3].split("=")[1];
      const itemID = `i:${id};`;
      console.log(itemID);
    }
        const type = await page.$$eval(".small ", (type) =>
        type.map((type) => type.textContent)
      );

        for (i = 0; i < type.length; i++) {
          console.log(type[i]);
        }

    browser.close();
  } catch (err) {
    console.log("Err =>", err);
  }
}

main(url);
