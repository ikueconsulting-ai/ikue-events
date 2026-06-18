const fs = require("fs");

const africa = {
  kenya: [
    {
      title: "GitHub Action Test Event",
      date: new Date().toISOString(),
      location: "Nairobi",
      country: "kenya",
      link: "https://www.ikueconsulting.com"
    }
  ]
};

fs.writeFileSync(
  "events/africa.json",
  JSON.stringify(africa, null, 2)
);

console.log("africa.json updated");
