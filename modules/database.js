const Sequelize = require('sequelize');
let db = {}

//Define connection
db.connection = new Sequelize (
    //process.env.POSTGRESS_DB,
    'notespot',
    process.env.POSTGRESS_USER, 
    process.env.POSTGRESS_PASSWORD,
    
    {
        host:'localhost',
        dialect:'postgres'
    }
)

//Model for the user table
db.Users = db.connection.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  name: Sequelize.STRING,
  surname: Sequelize.STRING,
  description: Sequelize.STRING,
  address: Sequelize.STRING
  },{
    timestamps: false // true by default
});

//Model for the house table
db.Lists = db.connection.define('list', {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  description: Sequelize.STRING,
  type: Sequelize.STRING,
  },{
    timestamps: false // true by default
  //owner_id: Sequelize.STRING
});

//Model for the rentals table
db.Videos = db.connection.define('video', {
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  description: Sequelize.STRING,
  }, {
    timestamps: false // true by default
});

//Table associations
db.Users.hasMany(db.Lists)
db.Lists.hasMany(db.Videos)
db.Videos.belongsTo(db.Lists)
db.Lists.belongsTo(db.Users)

db.connection
  .authenticate()
  .then( f => {
    console.log('Connection has been established successfully.');
  }, err => { 
    console.log('Unable to connect to the database:', err);
  })

//Dummy data insertion for test purposes


db.connection
  .sync({ force: true }) //Overwrite
  .then( f => {
    return Promise.all( [
        //Inserting demo users to database
        db.Users.create( {
          username: 'knorgias',
          password: 'knorgias',
          email: 'kostasnorgias@gmail.com',
          name: 'Konstantinos',
          surname: 'Norgias',
          description: 'Demo user for kostas'
        } ),
        db.Users.create( {
          username: 'nardoleon',
          password: 'nardoleon',
          email: 'leonardomocci@gmail.com',
          name: 'Leonardo',
          surname: 'Mocci',
          description: 'Demo user for leo'
        } ),
        db.Users.create( {
          username: 'kbursa',
          password: 'kbursa',
          email: 'kaanbursa@gmail.com',
          name: 'Kaan',
          surname: 'Bursa',
          description: 'Demo user for Kaan'
        } ),
        //Inserting demo houses to database
        db.Lists.create( {
          userId: 1,
          name: 'recommended',
          description: 'recommended basec on location',
          location: 'Amsterdam ',
          type: 'vicinity'
        } ),
        db.Lists.create( {
          userId: 1,
          name: 'early morning',
          description: 'custom list',
          location: '404 somestreet, Amsterdam ',
          type: 'pop'
        } ),
        db.Lists.create( {
          userId: 1,
          name: 'busy week',
          description: 'custom list',
          location: '404 somestreet, Amsterdam ',
          type: 'rock'
        } ),
        db.Lists.create( {
          userId: 1,
          name: 'chillout',
          description: 'custom list',
          location: '404 somestreet, Amsterdam ',
          type: 'jazz'
        } ),
        db.Videos.create({
          listId: 1,
          name: '15 Hidden Secrets & Best Places in Amsterdam',
          url: 'Xnp2IkoOppY',
          description: 'recommended Amsterdam'
        }),
        db.Videos.create({
          listId: 1,
          name: '10 best places to see in Amsterdam',
          url: '5G-lqrzTv-U',
          description: 'recommended Amsterdam'
        }),
        db.Videos.create({
          listId: 1,
          name: 'Amsterdam Travel Guide',
          url: 'kfe471jBCpA',
          description: 'recommended Amsterdam'
        })
    ])
  })
  .then( f => { console.log('Database updated successfully!') })
  //In case of any errors
  .catch( console.log.bind( console ) )

  module.exports = db;