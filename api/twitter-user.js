const http = require('http');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = (req, res) => {
  const { name } = req.query;
  const url = `https://api.twitter.com/1.1/users/show.json?screen_name=${name}`;

  const options = {
    headers: {
      'Authorization': `Bearer ${process.env.TWITTER_TOKEN}`
    }
  }
  http.get(url, options, (response) => {
    response.on('data', (data) => {
      res.json(JSON.parse(data.toString()))
    })
  });
}
