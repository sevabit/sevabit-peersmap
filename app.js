const app = require('express')();
const express = require('express');
const locations = require('./locations');

locations.cacheLocations();
setInterval(locations.cacheLocations, 140000); // amount of milliseconds between one update and another, in this case, 3 minutes


app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/'));

// blog home page
app.get('/', async (req, res) => {
    res.render('home', { locations: await locations.getCachedLocations() });
    setInterval(locations.getCachedLocations, 12000); // 20 seconds
});





app.listen(80);
/*
const testFolder = './';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
}) */

console.log('listening on port 80');
