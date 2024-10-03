const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('E-commerce Backend is Running');
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

