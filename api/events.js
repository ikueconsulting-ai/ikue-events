import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { continent = "online" } = req.query;

  // Mapping für spätere Erweiterung (z.B. Africa, Europe, Asia)
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
    const html = await fetch(url).then((r) => r.text());
    const $ = cheerio.load(html);

    const events = [];

    $(".search-event-card-wrapper").each((i, el) => {
      const title = $(el).find(".event-card__formatted-name--is-clamped").text().trim();
      const date = $(el).find(".event-card__date").text().trim();
      const link = "https://www.eventbrite.com" + $(el).find("a").attr("href");
      const image = $(el).find("img").attr("src");

      if (title) {
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
