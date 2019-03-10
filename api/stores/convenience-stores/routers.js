const path = require('path');
const router = require('express').Router();
const {
   serveConvenienceStores 
  } = require(path.join(__dirname, 'controllers'));
  
router.get('/api/stores/convenience-stores', serveConvenienceStores);

module.exports = router;