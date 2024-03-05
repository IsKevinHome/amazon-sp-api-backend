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
  const code = req.query.spapi_oauth_codeapi_oauth_code;
  console.log('✨code✨', code);
  //   console.log('~~~req.query~~~', req.query);
  //   try {
  //     const tokenResponse = await axios.post(
  //       'https://api.amazon.com/auth/o2/token',
  //       querystring.stringify({
  //         grant_type: 'authorization_code',
  //         code,
  //         client_id: CLIENT_ID,
  //         client_secret: CLIENT_SECRET,
  //         redirect_uri: REDIRECT_URI,
  //       })
  //     );
  //     const accessToken = tokenResponse.data.access_token;
  //     console.log('~~~logged access token~~~', accessToken);
  //     res.send(`~~~Access Token~~~: ${accessToken}`);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     res
  //       .status(500)
  //       .send('Error exchanging authorization code for access token');
  //   }
  //   res.send({
  //     request: req.query,
  //   });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
