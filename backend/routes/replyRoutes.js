const router = require('express').Router();
const {reply} = require('../controllers/replyController');
router.post('/', reply);
module.exports=router;
