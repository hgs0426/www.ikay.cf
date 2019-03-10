const https = require('https');
const http = require('http');

class Requester {

  http (options, body) {
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
            body: JSON.parse(data)
          };
          resolve(result);
        })
      });
      
      req.on('error', (e) => { reject(e); });
      req.end(JSON.stringify(body));
    });
  }

}
  
module.exports = Requester;
  