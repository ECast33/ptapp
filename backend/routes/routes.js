var express = require('express'),
     router = express.Router(),
     users = require('../api/controlers/users')(),
     authService = require('../api/services/authService')();

router.route('/users').post( users.post );
router.route('/auth' ).post( authService.post );


module.exports = router;
