// scripts/update-events.js
async function updateEvents() {
  // Your event update logic here
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

  // Write to file, update database, etc.
  console.log('Events updated:', JSON.stringify(data, null, 2));
}

updateEvents().catch(err => {
  console.error('Error updating events:', err);
  process.exit(1);
});
