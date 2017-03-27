const express = require( 'express' )
const app = express()
const session = require( 'express-session' )
const bodyparser = require( 'body-parser' )

//My Session
app.use( 
	session({
		secret: 'choco cookie',
		resave: false,
		saveUninitialized: false,
		cookie: { 
			secure: false,
			maxAge: 1000 * 60 * 60 
		}
	})
)

//My custom routes
const home = require( __dirname + '/routes/home' )
const users = require( __dirname + '/routes/users' )
const lists = require( __dirname + '/routes/lists' )

//My custom modules inclusions
const db = require( __dirname + '/modules/database' )
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'pug' );
app.use( express.static( __dirname + '/public' ) )
app.use( bodyparser.urlencoded( { extended: false } ) )

app.use( '/', home )
app.use( '/users', users )
app.use( '/lists', lists )

app.listen(9090, f => {
	console.log('Server running on port 9090')
})