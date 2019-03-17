const path = require('path');
const Requester = require(path.join(__dirname, '../', '../', 'libs', 'Requester'));
const config = require(path.join(__dirname, '../', '../', 'config')).api;



const requestPath = (params) => {

  let path, i, key;
  path = ``;
  path += `/api/stores/${params.storeCode}`;

  for (i = 0; i < params.queries.length; i += 1) {
    key = Object.keys(params.queries[i])[0];
    if (params.queries[i][key]) {
      path += i === 0 ? `?` : `&`;
      path += `${key}=${params.queries[i][key]}`
    }
  }
  // console.log('path:', path);
  return path;
};

const serveStores = async (req, res) => {

  const params = {
    storeCode: req.params.storeCode,
    queries: [
      {cityCodes: req.query.cityCodes },
      {offset: req.query.offset },
      {count: req.query.count }
    ]
  };
  // console.log(req.params, req.query)
  // console.log('params:',params)

  const requester = new Requester();
  let jwt;

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
    path: requestPath(params),
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  }
  try {
    const response = await requester.http(options);
    // console.log(response)
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  serveStores
};
