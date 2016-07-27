var express = require('express'),
     router = express.Router(),
     users = require('../api/controlers/users')(),
     authService = require('../api/services/authService')();
     clients  = require('../api/controlers/clients')();

router.route('/users').post( users.post );
router.route('/auth' ).post( authService.post );
router.route('/clients' ).post( clients.post );


module.exports = router;
