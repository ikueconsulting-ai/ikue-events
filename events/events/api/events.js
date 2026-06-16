export default async function handler(req, res) {
  const { continent = "Africa" } = req.query;

  const continentMap = {
    Africa: "Africa",
    Asia: "Asia",
    Europe: "Europe",
    NorthAmerica: "North America",
    SouthAmerica: "South America",
    Australia: "Australia",
    Oceania: "Oceania",
  };

  const location = continentMap[continent] || "Africa";

  const apiKey = process.env.EVENTBRITE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing EVENTBRITE_API_KEY" });
  }

  const url = new URL("https://www.eventbriteapi.com/v3/events/search/");
  url.searchParams.set("q", "agriculture");
  url.searchParams.set("location.address", location);
  url.searchParams.set("sort_by", "date");
  url.searchParams.set("expand", "venue,organizer");

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: "Eventbrite API error",
        status: response.status,
        body: text,
      });
    }

    const data = await response.json();

    const events = (data.events || []).map((e) => ({
      id: e.id,
      name: e.name?.text,
      description: e.description?.text,
      start: e.start?.local,
      end: e.end?.local,
      url: e.url,
      venue: {
        name: e.venue?.name,
        city: e.venue?.address?.city,
        country: e.venue?.address?.country,
      },
      organizer: e.organizer?.name,
    }));

    res.status(200).json({
      continent,
      source: "eventbrite",
      count: events.length,
      events,
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
}
