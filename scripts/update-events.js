export default function handler(req, res) {
  // CORS – WICHTIG für Wix LIVE
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Deine Event-Daten
  const data = {
    global: [
      {
        title: "Test Global Event",
        date: "2026-06-17T08:00:05.829Z",
        location: "Online",
        country: "global",
        link: "https://www.ikueconsulting.com",
        image: ""
      }
    ],
    regional: {
      thailand: [
        {
          title: "Test Event Thailand",
          date: "2026-06-17T08:00:05.829Z",
          location: "Bangkok, Thailand",
          country: "thailand",
          link: "https://www.ikueconsulting.com",
          image: ""
        }
      ],
      kenya: [
        {
          title: "Test Event Kenya",
          date: "2026-06-17T08:00:05.829Z",
          location: "Nairobi, Kenya",
          country: "kenya",
          link: "https://www.ikueconsulting.com",
          image: ""
        }
      ]
    }
  };

  res.status(200).json(data);
}
