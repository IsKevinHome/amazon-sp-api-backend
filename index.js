const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // will be set by heroku
const nodeEnv = process.env.NODE_ENV; // will be set by heroku

app.get('/', (req, res) => {
  res.send({
    status: 'online',
    nodeEnv,
    port,
  });
});

app.get('/api/stopserver', (req, res) => {
  console.log('!!! Stopping server !!!');
  process.exit(1);
});

app.get('/api/oauth/amazon', (req, res) => {
  console.log(req.query);
  res.send({
    status: 'success',
    request: req.query,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
