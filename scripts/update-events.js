// scripts/update-events.js
const fs = require('fs');
const path = require('path');

async function updateEvents() {
  const data = {
    global: [
      {
        title: "Test Global Event",
        date: new Date().toISOString(),
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
          date: new Date().toISOString(),
          location: "Bangkok, Thailand",
          country: "thailand",
          link: "https://www.ikueconsulting.com",
          image: ""
        }
      ],
      kenya: [
        {
          title: "Test Event Kenya",
          date: new Date().toISOString(),
          location: "Nairobi, Kenya",
          country: "kenya",
          link: "https://www.ikueconsulting.com",
          image: ""
        }
      ]
    }
  };

  // Write to file
  const eventsFile = path.join(__dirname, '../events.json');
  fs.writeFileSync(eventsFile, JSON.stringify(data, null, 2));
  console.log('Events updated:', JSON.stringify(data, null, 2));
}

updateEvents().catch(err => {
  console.error('Error updating events:', err);
  process.exit(1);
});
