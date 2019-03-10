const path = require('path');
const Requester = require(path.join(__dirname, '../', '../', '../', 'libs', 'Requester'));
const config = require(path.join(__dirname, '../', '../', '../', 'config')).api;

const serveConvenienceStores = async (req, res) => {
  const requester =  new Requester();
    const options = {
    hostname: config.hostname,
    port: config.port,
    path: config.path,
    method: 'GET'
  };
  // console.log(options);  
  try {
    const results = await requester.http(options);
    // console.log(results); 
    res.json(results);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  serveConvenienceStores
};