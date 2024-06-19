import getListings from './get-listings.js';
import getBookings from './get-bookings.js';
import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/get-dubai', (req, res) => {
  const city = 'Dubai';
  const bedrooms = 5;

  try {
    const listings = getListings(city, bedrooms);
    res.send(listings);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get('/get-listings', (req, res) => {
  const city = req.query.city;
  const bedrooms = parseInt(req.query.bedrooms);
  const bathrooms = parseInt(req.query.bathrooms);
  const amenities = req.query.amenities;

  try {
    const listings = getListings(city, bedrooms, bathrooms, amenities);
    res.send(listings);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get('/openapi.yaml', (req, res) => {
  res.sendFile(path.resolve() + '/openapi.yaml');
});

app.get('/openapi-v2.yaml', (req, res) => {
  res.sendFile(path.resolve() + '/openapi-v2.yaml');
});
app.get('/nationality.yaml', (req, res) => {
  res.sendFile(path.resolve() + '/nationality.yaml');
});

app.get('/.well-known/ai-plugin.json', (req, res) => {
  res.sendFile(path.resolve() + '/ai-plugin.json');
});

app.get('/logo.png', (req, res) => {
  res.sendFile(path.resolve() + '/logo.png');
});

app.get('/bookings', (req, res) => {
  const customerName = req.query.customerName;
  const city = req.query.city;
  try {
    const bookings = getBookings(customerName, city);
    res.send(bookings);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }

  res.send(lastBooking);
});

app.post('/post-a-booking', (req, res) => {
  const propertyId = req.body['property-id'] ? req.body['property-id'] : 0;

  // Generate date-time for the next day at 14:00 hrs
  const dateTime = new Date();
  dateTime.setDate(dateTime.getDate() + 1);
  dateTime.setHours(14, 0, 0, 0);

  // Load and parse the bookings.json file
  let data = fs.readFileSync('bookings.json');
  let bookings = JSON.parse(data);

  // Add the new booking
  bookings.push({
    'property-id': propertyId,
    'date-time': dateTime.toISOString(),
  });

  // Convert back to JSON and write to the file
  data = JSON.stringify(bookings, null, 2);
  fs.writeFileSync('bookings.json', data);

  res.send({ message: 'Booking has been successfully added.' });
});

app.listen(process.env.PORT || 8080);
