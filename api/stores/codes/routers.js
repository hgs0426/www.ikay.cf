const path = require('path');
const router = require('express').Router();
const { serveCodes } = require(path.join(__dirname, 'controllers'));
  
router.get('/api/stores/codes/:code/names/:name', serveCodes);

module.exports = router;