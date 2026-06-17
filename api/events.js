export const config = {
  runtime: "nodejs18.x",
};

export default async function handler(req, res) {
  try {
    // Nur ein HARDCODED TEST, um zu prüfen, ob die Function läuft
    const now = new Date().toISOString();

    const globalEvents = [
      {
        title: "Test Global Event",
        date: now,
        location: "Online",
        country: "global",
        link: "https://www.ikueconsulting.com",
        image: "",
      },
    ];

    const regionalEvents = {
      thailand: [
        {
          title: "Test Event Thailand",
          date: now,
          location: "Bangkok, Thailand",
          country: "thailand",
          link: "https://www.ikueconsulting.com",
          image: "",
        },
      ],
      kenya: [
        {
          title: "Test Event Kenya",
          date: now,
          location: "Nairobi, Kenya",
          country: "kenya",
          link: "https://www.ikueconsulting.com",
          image: "",
        },
      ],
    };

    res.status(200).json({
      global: globalEvents,
      regional: regionalEvents,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Unknown error" });
  }
}
