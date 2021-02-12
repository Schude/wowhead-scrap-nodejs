const puppeteer = require("puppeteer");
// const url = "https://www.wowhead.com/items/trade-goods?filter=166;2;0";

async function main() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
    // const page = await browser.newPage();
    // page.setDefaultNavigationTimeout(0);
    // await page.goto(url, { waitUntil: "load", timeout: 0 });

    // const links = await page.$$eval(".listview-cleartext ", (url) =>
    //   url.map((link) => link.href)
    // );

    // for (i = 0; i < links.length; i++) {
    //   const id = links[i].split("/")[3].split("=")[1];
    //   const itemID = `i:${id};`;
    //   console.log(itemID);
    // }
    let types = [];
    let ids = [];
    for (i = 0; i < 4; i++) {
      const page = await browser.newPage();
      let tempURL = `https://www.wowhead.com/items/trade-goods?filter=166;8;0#items;${i * 50}`;
      console.log(tempURL);
      await page.goto(tempURL, { waitUntil: "load", timeout: 0 });
      await page.waitForSelector("tbody");
      let x = await page.$$eval(".small ", (type) =>
        type.map((type) => type.textContent)
      );

      x.map((a) => (types = [...types, a]));

      let y = await page.$$eval(".listview-cleartext ", (url) =>
        url.map((link) => link.href)
      );
      y.map((b) => (ids = [...ids, b]));

      page.close();
    }
    for (i = 0; i < types.length; i++) {
      console.log(types[i]);
    }

    for (i = 0; i < ids.length; i++) {
      const id = ids[i].split("/")[3].split("=")[1];
      const itemID = `i:${id};`;

      console.log(itemID);
    }
    console.log(types.length);
    browser.close();
    console.log("Browsed Closed.");
  } catch (err) {
    console.log("Err =>", err);
  }
}

main();
