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

const phaseChangeData = {
  10: { specific_volume_liquid: 0.0035, specific_volume_vapor: 0.0035 },
  20: { specific_volume_liquid: 0.0029, specific_volume_vapor: 0.0041 },
  30: { specific_volume_liquid: 0.0027, specific_volume_vapor: 0.0045 },
  40: { specific_volume_liquid: 0.0025, specific_volume_vapor: 0.005 },
  50: { specific_volume_liquid: 0.0023, specific_volume_vapor: 0.0055 },
};

app.get('/phase-change-diagram', (request, response) => {
  const pressure = parseFloat(request.query.pressure);
  if (!pressure)
    return response.status(400).json({
      error: 'El parámetro "presure" es requerido y debe ser un número',
    });

  const result = phaseChangeData[pressure];

  if (result) response.json(result);
  else
    response
      .status(400)
      .json({ error: 'No se encontraron datos para la presión solicitada' });
});

module.exports = app;
