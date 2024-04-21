import { readFileSync, writeFileSync } from 'fs';

// Load and parse the JSON file
let data = readFileSync('listings.json');
let listings = JSON.parse(data);

// Add "id" property to objects starting from index 110
for (let i = 1; i < listings.length; i++) {
  listings[i].id = i + 1; // or any other logic for generating id
}

// Convert back to JSON and write to the file
data = JSON.stringify(listings, null, 2);
writeFileSync('listings-v2.json', data);
