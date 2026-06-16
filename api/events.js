export const config = {
  runtime: "nodejs",
};

import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { continent = "online" } = req.query;

  const continentMap = {
    online: "https://www.eventbrite.com/d/online/agriculture/",
    Africa: "https://www.eventbrite.com/d/africa/agriculture/",
    Europe: "https://www.eventbrite.com/d/europe/agriculture/",
    Asia: "https://www.eventbrite.com/d/asia/agriculture/",
    NorthAmerica: "https://www.eventbrite.com/d/north-america/agriculture/",
    SouthAmerica: "https://www.eventbrite.com/d/south-america/agriculture/",
    Oceania: "https://www.eventbrite.com/d/oceania/agriculture/",
    Australia: "https://www.eventbrite.com/d/australia/agriculture/",
  };

  const url = continentMap[continent] || continentMap.online;

  try {
    const html = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    }).then((r) => r.text());

    const $ = cheerio.load(html);
    const events = [];

    $("a[href*='/e/']").each((i, el) => {
      const link = "https://www.eventbrite.com" + $(el).attr("href");

      const title =
        $(el).attr("aria-label") ||
        $(el).find("div").first().text().trim() ||
        $(el).text().trim();

      const date =
        $(el).find("time").attr("datetime") ||
        $(el).find("time").text().trim() ||
        "";

      const image =
        $(el).find("img").attr("src") ||
        $(el).find("img").attr("data-src") ||
        "";

      if (title && link.includes("/e/")) {
        events.push({
          title,
          date,
          link,
          image,
        });
      }
    });

    res.status(200).json({
      continent,
      count: events.length,
      events,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
