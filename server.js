import getListings from './get-listings.js';
import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

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
    const listings = getListings(city);
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

app.get('/.well-known/ai-plugin.json', (req, res) => {
  res.sendFile(path.resolve() + '/ai-plugin.json');
});

app.get('/logo.png', (req, res) => {
  res.sendFile(path.resolve() + '/logo.png');
});

app.listen(process.env.PORT || 8080);
