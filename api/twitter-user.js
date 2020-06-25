const Twitter = require('twitter-lite');
const { get } = require('https');

module.exports = async (req, res) => {
  const { name } = req.query;

  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET
  });

  console.log(`key: ${process.env.TWITTER_CONSUMER_KEY}`)
  console.log(`secret: ${process.env.TWITTER_CONSUMER_SECRET}`)

  const tokenResponse = await client.getBearerToken();

  const url = `https://api.twitter.com/1.1/users/show.json?screen_name=${name}`;

  const options = {
    headers: {
      'Authorization': `Bearer ${tokenResponse.access_token}`
    }
  }
  console.log(`token: ${tokenResponse.access_token}`);

  get(url, options, (response) => {
    response.on('data', (data) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(JSON.parse(data.toString()))
    })
    response.on('error', (err) => {
      res.send(err);
    })
  });
}
