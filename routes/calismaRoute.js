
const express = require('express');
const calismaController = require('../controllers/calismaController');

const router = express.Router();

router.route('/').post(calismaController.createCalisma);
router.route('/').get(calismaController.getAllCalismas);
router.route('/:slug').get(calismaController.getCalisma);
router.route('/:slug').delete(calismaController.deleteCalisma);


module.exports = router;