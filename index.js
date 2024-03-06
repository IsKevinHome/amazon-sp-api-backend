const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // will be set by heroku
const nodeEnv = process.env.NODE_ENV; // will be set by heroku

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI; // Must match the redirect URI in your app settings

app.get('/', (req, res) => {
  res.send({
    status: 'online',
    nodeEnv,
    port,
  });
});

app.get('/api/oauth/callback', async (req, res) => {
  console.log('✨req.query✨', req.query);

  const { spapi_oauth_code: code, state, selling_partner_id } = req.query;
  console.log('✨code✨', code);

  try {
    const tokenResponse = await axios.post(
      'https://api.amazon.com/auth/o2/token',
      {
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }
    );
    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;

    console.log('✨refreshToken✨', refreshToken);
    console.log('✨accessToken✨', accessToken);

    res.redirect(
      '/api/oauth/success?refreshToken=' +
        refreshToken +
        '&accessToken=' +
        accessToken
    );
  } catch (error) {
    console.error('Error:', error);
    res
      .status(500)
      .send('Error exchanging authorization code for access token');
  }
});

app.get('/api/oauth/success', (req, res) => {
  const { refreshToken, accessToken } = req.query;

  res.send({
    refreshToken,
    accessToken,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
