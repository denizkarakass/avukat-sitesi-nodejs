
const express = require('express');
const { route } = require('express/lib/application');
const pageControler = require('../controllers/pageController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const redirectMiddleware = require('../middlewares/redirectMiddleware'); 



const router = express.Router();

router.route('/').get(pageControler.getIndexPage);
router.route('/hakkinda').get(pageControler.getHakkindaPage);
router.route('/randevu').get(pageControler.getRandevuPage);
router.route('/randevu').post(pageControler.sendEmail);
router.route('/iletisim').get(pageControler.getİletisimPage);
router.route('/iletisim').post(pageControler.sendEmail);
router.route('/register').get(authMiddleware, pageControler.getRegisterPage);
router.route('/login').get( redirectMiddleware, pageControler.getLoginPage);


module.exports = router;