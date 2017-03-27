const express = require('express');
const router = express.Router();
const db = require('../modules/database');


router.get('/', (req, res) => {
	
	if(!req.session.user){
		res.render('index');
	} else {
		res.redirect('/profile')
	}
})

module.exports = router