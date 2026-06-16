export const config = {
  runtime: "nodejs18.x",
};

export default async function handler(req, res) {
  try {
    // FAO Event Feed (JSON)
    const FAO_URL = "https://www.fao.org/api/events/en"; 

    const response = await fetch(FAO_URL);
    const data = await response.json();

    const globalEvents = [];
    const regionalEvents = {};

    // Hilfsfunktion: Land automatisch extrahieren
    function extractCountry(location) {
      if (!location) return "global";

      const lower = location.toLowerCase();

      // Online / Virtual Events → global
      if (
        lower.includes("online") ||
        lower.includes("virtual") ||
        lower.includes("hybrid")
      ) {
        return "global";
      }

      // Letztes Wort als Land nehmen
      const parts = location.split(",");
      const last = parts[parts.length - 1].trim().toLowerCase();

      // Sonderzeichen entfernen
      return last.replace(/[^a-z]/g, "");
    }

    // Events verarbeiten
    data.events.forEach((event) => {
      const title = event.title || "";
      const date = event.date || "";
      const location = event.location || "";
      const link = event.url || "";
      const image = event.image || "";

      const country = extractCountry(location);

      // GLOBAL EVENTS (alle Events)
      globalEvents.push({
        title,
        date,
        location,
        country,
        link,
        image,
      });

      // REGIONALE EVENTS (nach Land gruppiert)
      if (!regionalEvents[country]) {
        regionalEvents[country] = [];
      }

      regionalEvents[country].push({
        title,
        date,
        location,
        country,
        link,
        image,
      });
    });

    res.status(200).json({
      global: globalEvents,
      regional: regionalEvents,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
