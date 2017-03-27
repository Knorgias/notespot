const express = require('express');
const router = express.Router();
const db = require('../modules/database');


// router.get('/', (req, res) => {
	
// 	if(!req.session.user){
// 		res.render('index');
// 	} else {
// 		res.redirect('/profile')
// 	}
// })

router.post('/register', (req, res) =>{
	var newUser = {
		name: req.body.username,
		email: req.body.email,
		password: req.body.password
	}

	db.User.create(newUser).then(theuser => {
		req.session.user = theuser
		res.redirect('/profile')
	})
	
})

router.get('/login', (req, res) => {
	res.render('login')
})

router.post('/login', (req, res) => {
	db.User.findOne( {
		where: {
			name: req.body.username
		},
		include: [ {
			model: db.Post,
			include: [ db.Comment ]
		} ]
	}).then( user => {

		if(user == null  || user.password != req.body.password){
			res.send('Wrong password or invalid user')
		} else {
			req.session.user = theuser
			res.redirect('profile');
		}
	}).catch( err => {
		console.log(err);
	})

})


router.get('/profile', (req, res) => {

	if(req.session.user == null){
		res.redirect('/')
	} else {
		db.User.findOne( {
			where: {
				email: req.session.user.email
			}

		}).then( user => {
			res.render('profile', { user: user });
		}).catch( err => {
			console.log(err);
		})
	}
})


router.get('/:id', (req, res) => {

	if(req.params.id == null){
		res.send('no user found')
	} else {
	db.User.findOne( {
		where: {
			id: req.params.id
		},
		include: [ {
			model: db.Post,
			include: [db.Comment]
			} ]
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
		res.redirect('/profile')
	}).catch(err => {
		console.log(err);
	})
	
	

})

router.post('/search', (req, res) => {
	var searchQuery = req.body.search.toLowerCase();

	db.User.findAll({
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


router.post('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/')
})



module.exports = router;