var db = require('../db');
const util = require('util');

// promisify mysql

module.exports = {
  messages: {
    get: function (req, callback) {
      let messageQueryString =
      `SELECT messages.id id, messages.contents contents, rooms.name roomname, users.name username
      FROM messages
        INNER JOIN rooms
          ON messages.room_id = rooms.id
        INNER JOIN users
          ON messages.user_id = users.id`;

      db.dbConnection.query(messageQueryString, (err, results) => {
        if (err) {
          callback(err);
        }
        console.log('Retrieved messages from database!');
        console.log(results);
        callback(results);
      });
    }, // READ a function which produces all the messages
    post: function (messageObj, callback) {

      // //create a formatted string 'stringQuery'
      // var stringQuery = `INSERT INTO messages (contents, user_id, room_id) VALUES ('${messageObj.message}', '${messageObj}', NULL)`;
      let userQueryString = `SELECT id FROM users WHERE name='${messageObj.username}'`;
      let roomQueryString = `SELECT id FROM rooms WHERE name='${messageObj.roomname}'`;
      let messageQueryString = `INSERT INTO messages (contents, user_id, room_id) VALUES("${messageObj.message}", (${userQueryString}), (${roomQueryString}))`;
      console.log(messageQueryString);

      // //connect to dbConnection and perform query

      // db.dbConnection.connect((err) => {
      //   if (err) { callback(err); }
      //   console.log('Connected to database!');
      db.dbConnection.query(messageQueryString, (err, result) => {
        if (err) { callback(err); }
        console.log(`Inserted ${messageObj.message} into database!`);
        console.log(result);
        //get back some object/array from mySQL query, maybe manipulate to format, which will go back to controllers.users.post for sending off to client

        // potentially close dbConnection? (i.e. dbConnection.close() )
        //db.dbConnection.end();
        callback(result);
      });
      //   });
    } // CREATE a function which can be used to insert a message into the database; insert into the SQL table the message, assign all the appropriate attributes like room id, user id, etc.
  },

  users: {
    // Ditto as above.
    get: function () { }, //READ OPERATION
    post: function (username, callback) { // recieves a username string from controllers.users.post // THIS COULD BE RENAMED TO 'users.createNewUser' OR SIMILAR

      //create a formatted string 'stringQuery'
      var stringQuery = `INSERT INTO users (name, description, photo) VALUES ('${username}', NULL, NULL)`;

      //connect to dbConnection and perform query

      db.dbConnection.connect((err) => {
        if (err) { callback(err); }
        console.log('Connected to database!');
        db.dbConnection.query(stringQuery, (err, result) => {
          if (err) { callback(err); }
          console.log(`Inserted ${username} into database!`);
          console.log(result);
          //get back some object/array from mySQL query, maybe manipulate to format, which will go back to controllers.users.post for sending off to client

          // potentially close dbConnection? (i.e. dbConnection.close() )
          //db.dbConnection.disconnect();

          callback(result);
        });
      });


    }

  }
};