var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) { }, // a function which handles a get request for all messages Invoke a model method with data, receive it back, send all data to client to render/display
    post: function (req, res) {  // a function which handles a post posting a message
      console.log('successfully hit the messages/POST handler');
      console.log('req body:', req.body);

      models.messages.post(req.body, (data) => {
        console.log('database response: ', data);
        res.end(JSON.stringify(data));
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) { },
    post: function (req, res) {
      // console.log('successfully hit the users/POST handler');
      // console.log('req body:', req.body);

      //send off data to models/index.js
      let username = req.body.username;
      console.log('username passing to database is:', username);

      //send off data to models.users.post
      models.users.post(username, (data) => {
        console.log('database response: ', data);

        //have some sort of confirmation data from mySQL and send off data as response to client's AJAX request
        res.end(JSON.stringify(data));
      });
    }
  }
};

