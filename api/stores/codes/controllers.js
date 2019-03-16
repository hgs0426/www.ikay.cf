const path = require('path');
const Requester = require(path.join(__dirname, '../', '../', '../', 'libs', 'Requester'));
const config = require(path.join(__dirname, '../', '../', '../', 'config')).api;

const serveCodes = async (req, res) => {
  let jwt;

  const requester = new Requester();
  try {
    const response = await requester.getJwt();
    jwt = response.resBody.jwt;
    // console.log('jwt:', jwt);
  } catch (error) {
    res.status(403).json({
      error: {
        message: 'getting jwt from api server'
      }
    })
  }

  const options = {
    hostname: config.hostname,
    port: config.port,
    path: `/api/stores/codes/${req.params.code}/names/${req.params.name}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  }
  try {
    const response = await requester.http(options);
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  serveCodes
};
