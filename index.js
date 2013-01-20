var request = require('request');

var Sprintly = function(email, apiKey) {
    this.apiUri = 'https://sprint.ly/api';
    this.auth = function(options, auth) {
      options.headers = options.headers || {};
      auth = auth || {
        email: email,
        apiKey: apiKey
      };
      options.headers.Authorization = 'Basic ' + new Buffer(auth.email + ':' + auth.apiKey).toString('base64');
    };
  };

Sprintly.prototype.getPeople = function getPeople(productId, callback) {
  var options = {
    method: 'GET',
    uri: this.apiUri + '/products/' + productId + '/people.json'
  };
  this.auth(options);

  request(options, function(error, response, body) {
    callback(error, JSON.parse(body));
  });
};

Sprintly.prototype.addItem = function addItem(auth, productId, item, callback) {
  var options = {
    method: 'POST',
    uri: this.apiUri + '/products/' + productId + '/items.json',
    form: item
  };
  this.auth(options, auth);

  request(options, function(error, response, body) {
    error = error || response.code >= 400 ? body : null;
    if (error) {
      console.error(error);
      return callback(error);
    }

    item = JSON.parse(body);
    callback(error, item);
  });
};

Sprintly.prototype.addCommentToItem = function addCommentToItem(auth, productId, item_number, comment, callback) {
  var options = {
    method: 'POST',
    uri: this.apiUri + '/products/' + productId + '/items/' + item_number + '/comments.json',
    form: {
      body: comment
    }
  };
  this.auth(options, auth);

  request(options, function(error, response, body) {
    callback(error, body);
  });
};

Sprintly.prototype.getItems = function getItems(productId, callback) {
  process.nextTick(function() {
    callback(null, [])
  });
};

module.exports = Sprintly;
