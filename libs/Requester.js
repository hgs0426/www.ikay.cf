const https = require('https');
const http = require('http');
const path = require('path');
const config = require(path.join(__dirname, '../', 'config')).api;

class Requester {

  http (options, reqBody) {
    return new Promise( (resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data += chunk;
          // console.log(data);
        });
        res.on('end', ()=> {
          const result = {
            statusCode: res.statusCode,
            resBody: JSON.parse(data)
          };
          resolve(result);
        })
      });
      
      req.on('error', (e) => { reject(e); });
      req.end(JSON.stringify(reqBody));
    });
  }

  async getJwt() {
    
    const options = {
      hostname: config.hostname,
      port: config.port,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const reqBody = config.userInfo;
    try {
      const jwt = await this.http(options, reqBody);
      return jwt;
    } catch (error) {
      throw new Error(error);
    }
  }
}
  
module.exports = Requester;
  