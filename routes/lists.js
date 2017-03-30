const express = require('express');
const router = express.Router();
const db = require('../modules/database');

router.post('/getVideos', (req, res) => {
	console.log('***AJAX request triggered!***')
	db.Videos.findAll({
		where: {
			listId : req.body.id
		}
	})
	.then( videos => {
		let myRes = []
		videos.forEach( video => {
			myRes.push(video.url)
		})
		res.send(myRes)
	})
	.catch( err => {
		console.log(err)
	})
})

module.exports = router