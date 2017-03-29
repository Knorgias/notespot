const express = require('express');
const router = express.Router();
const db = require('../modules/database');


router.get('/', (req, res) => {
	
	if(!req.session.user){
		res.render('index');
	} else {
		res.redirect('profile')
	}
})

router.get('/register', (req, res) => {
	res.render('register')
})

router.post('/register', (req, res) =>{
	var newUser = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		name: req.body.name,
		surname: req.body.surname,
		address: req.body.address
	}

	db.Users.create(newUser).then( user => {
		req.session.user = user
		res.redirect('profile')
	})
	
})

router.get('/login', (req, res) => {
	res.render('login')
})

/*After user submits login data*/
router.post('/login', (req, res) => {
	console.log(req.body.username)
	db.Users.findOne( {
		where: {
			username: req.body.username
		}
		// include: [ {
		// 	model: db.Post,
		// 	include: [ db.Comment ]
		// } ]
	}).then( user => {
		console.log('User is: ' + user.username)
		if(user == null  || user.password != req.body.password){
			res.send('Wrong password or invalid user')
		} else {
			req.session.user = user.username
			res.redirect('profile');
		}
	}).catch( err => {
		console.log(err);
	})

})

/* When profile page is requested*/
router.get('/profile', (req, res) => {

	if(req.session.user == null){
		res.redirect('/')
	} else {
		db.Users.findOne( {
			where: {
				username: 'knorgias'
			},
			include: [{
				model: db.Lists,
				include: [db.Videos]
			}]
		}).then( user => {
			console.log('***Beggining of object ***')
			console.log(JSON.stringify(user))
			console.log('***Ending of object ***')
			res.render('profile', { user: user })
		}).catch( err => {
			console.log(err);
		})
	}
})

/*When specific user id is requested*/
router.get('/find/:id', (req, res) => {

	if(req.params.id == null){
		res.send('no user found')
	} else {
	db.Users.findOne( {
		where: {
			id: req.params.id
		}
		// include: [ {
		// 	model: db.Post,
		// 	include: [db.Comment]
		// 	} ]
	}).then( user => {
		res.render('users', { user: user })
		
	}).catch( err => {
		console.log(err);
	})
}

})

router.post('/status', (req, res) => {
	const newPost = {
		content: req.body.post,
		userId: req.session.user.id
	}
	

	db.Post.create(newPost).then( () => {
		res.redirect('profile')
	}).catch(err => {
		console.log(err);
	})
	
	

})

router.post('/search', (req, res) => {
	var searchQuery = req.body.search.toLowerCase();

	db.Users.findAll({
		where: {
			name: {
				$like: searchQuery
			}
		}
	}).then(foundUsers=> {

		res.render('search', {users: foundUsers, query: searchQuery});

	}).catch( err => {
		console.log(err);
	})
})

/*Get video list after AJAX request*/
router.get('/videos', (req, res) => {
	console.log('Retrieving videos..')
	db.Videos.findAll()
	.then( videos => {
		let myVideos = []
		videos.forEach( video => {
			console.log('Video url: ', video.url)
			myVideos.push(video.url)
		})
	})
	.catch( err => {
		console.log(err);
	})
})


router.get('/logout', (req, res) => {
	console.log('Trying to logout')
	req.session.destroy()
	console.log('Session destroyed')
	res.redirect('/')
})



module.exports = router;