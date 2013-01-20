var request = require('request');

var Sprintly = function(email, apiKey) {
    this.apiUri = 'https://sprint.ly/api';
    this.auth = function(options) {
      options.headers = options.headers || {};
      options.headers.Authorization = 'Basic ' + new Buffer(email + ':' + apiKey).toString('base64');
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

Sprintly.prototype.addItem = function addItem(productId, item, callback) {
  var options = {
    method: 'POST',
    uri: this.apiUri + '/products/' + productId + '/items.json',
    form: item
  };
  this.auth(options);

  request(options, function(error, response, body) {
    callback(error, body);
  });
};

Sprintly.prototype.addCommentToItem = function addCommentToItem(productId, item_number, comment, callback) {
  var options = {
    method: 'POST',
    uri: this.apiUri + '/products/' + productId + '/items/' + item_number + '/comments.json',
    form: comment
  };
  this.auth(options);

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
