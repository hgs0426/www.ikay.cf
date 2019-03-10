const path = require('path');
const Requester = require(path.join(__dirname, '../', '../', '../', 'libs', 'Requester'));
const config = require(path.join(__dirname, '../', '../', '../', 'config')).api;

const getJwt = (body) => {
  return new Promise ( async (resolve, reject)=> {
    const requester =  new Requester();
    const options = {
      hostname: config.hostname,
      port: config.port,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const results = await requester.http(options, body);
      // console.log(results); 
      resolve(results);
    } catch (err) {
      rejcet(err);
    }
  });
}

const serveConvenienceStores = async (req, res) => {

  const results = await getJwt(config.userInfo);
  if ( 200 !== results.statusCode ) {
    res.status(results.statusCode).json(results);
  }
  const requester =  new Requester();
  const options = {
    hostname: config.hostname,
    port: config.port,
    path: '/api/stores/convenience-stores',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${results.body.jwt}`
    }
  };
  try {
    const results = await requester.http(options);
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  serveConvenienceStores
};