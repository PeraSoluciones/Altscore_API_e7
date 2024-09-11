const express = require('express');

const app = express();

const damagedMap = {
  navigation: 'NAV-01',
  communications: 'COM-02',
  life_support: 'LIFE-03',
  engines: 'ENG-04',
  deflector_shield: 'SHLD-05',
};

const getRandomDamageSystem = () => {
  const systems = Object.keys(damagedMap);
  const randomIndex = Math.floor(Math.random() * systems.length);
  return systems[randomIndex];
};

let damageSystem = getRandomDamageSystem();

app.get('/status', (request, response) => {
  return response.json({ damaged_system: damageSystem });
});

app.get('/repair-bay', (request, response) => {
  const code = damagedMap[damageSystem];
  const html = `<!DOCTYPE html>
<html>
<head>
    <title>Repair</title>
</head>
<body>
<div class="anchor-point">${code}</div>
</body>
</html>`;
  return response.send(html);
});

app.post('/teapot', (request, response) => {
  return response.status(418).send(`I'm a teapot`);
});

module.exports = app;
