const path = require('path');
const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const convenienceStores = require(path.join(__dirname, 'api', 'stores', 'convenience-stores', 'routers'));

router.get('/', (req, res) => {
  // analyze(req.headers); // 사용성 분석 작업 필요
  res.sendFile(path.join(__dirname, 'public','html','index.html'));
});

router.use('/', convenienceStores);

module.exports = router;