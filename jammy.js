// Jammy - a lightweight wrapper for the thisismyjam.com API.
// Built for the That Was My Jam website.
// See http://www.thisismyjam.com/developers/beta for API details.

// Contrib modules
var request = require('request');
var _ = require('underscore');

// Cache
var jamjar = {};

// API details
exports.version = '0.0.1';
exports.apiurl = 'api.thisismyjam.com';
exports.apiversion = '1';
exports.apikey = '987bcab01b929eb2c07877b224215c92';

/*
Person

http://api.thisismyjam.com/1/IFTFOM.json?key=987bcab01b929eb2c07877b224215c92

Returns information about the requested person, along with their current jam (if any).
*/
exports.getUser = function (username, callback) {
  var url = 'http://' + this.apiurl + '/' + this.apiversion + '/' + username + '.json?key=' + this.apikey;
  request(url, function (error, response, body){
    return callback(error, JSON.parse(body));
  });
};

/*
Likes

http://api.thisismyjam.com/1/IFTFOM/likes.json?key=987bcab01b929eb2c07877b224215c92 
http://api.thisismyjam.com/1/IFTFOM/likes.json?show=current&key=987bcab01b929eb2c07877b224215c92 
http://api.thisismyjam.com/1/IFTFOM/likes.json?show=past&key=987bcab01b929eb2c07877b224215c92 

Returns a list of liked jams. Takes the optional parameter "show", which specifies whether to include only current or past (expired) jams.
*/
exports.getLikes = function (username, page, option, callback) {

  // 'option' is an optional argument
  if (!callback || typeof callback != "function") {
    callback = option;
    option = undefined;
  }
  
  var url = 'http://' + this.apiurl + '/' + this.apiversion + '/' + username + '/likes.json?key=' + this.apikey;

  // Paging
  if (page > 1) {
    url += '&page=' + page;
  }
  
  request(url, function (error, response, body){
    return callback(error, JSON.parse(body));
  });
};

/*
Jams

http://api.thisismyjam.com/1/IFTFOM/jams.json?key=987bcab01b929eb2c07877b224215c92 
http://api.thisismyjam.com/1/IFTFOM/jams.json?show=past&key=987bcab01b929eb2c07877b224215c92 

Returns a list of the person's jams. To omit the current jam, add the parameter show=past.
*/
exports.getJams = function (username, page, option, callback) {

  // 'option' is an optional argument
  if (!callback || typeof callback != "function") {
    callback = option;
    option = undefined;
  }
  
  var url = 'http://' + this.apiurl + '/' + this.apiversion + '/' + username + '/jams.json?key=' + this.apikey;

  // Paging
  if (page > 1) {
    url += '&page=' + page;
  }
  
  request(url, function (error, response, body){
    return callback(error, JSON.parse(body));
  });
};

/*
Following

http://api.thisismyjam.com/1/IFTFOM/following.json?key=987bcab01b929eb2c07877b224215c92
http://api.thisismyjam.com/1/IFTFOM/following.json?order=followedDate&key=987bcab01b929eb2c07877b224215c92
http://api.thisismyjam.com/1/IFTFOM/following.json?order=affinity&key=987bcab01b929eb2c07877b224215c92
http://api.thisismyjam.com/1/IFTFOM/following.json?order=name&key=987bcab01b929eb2c07877b224215c92 

Returns a list of people that a particular person is following. order=followedDate orders by date followed; order=affinity currently orders by number of likes from the requested person; order=name orders by name alphabetically.
*/
exports.getFollowing = function (username, option, callback) {

  // 'option' is an optional argument
  if (!callback || typeof callback != "function") {
    callback = option;
    option = undefined;
  }
  
  var url = 'http://' + this.apiurl + '/' + this.apiversion + '/' + username + '/following.json?key=' + this.apikey;
  request(url, function (error, response, body){
    return callback(error, JSON.parse(body));
  });
};

/*
Followers

http://api.thisismyjam.com/1/IFTFOM/followers.json?key=987bcab01b929eb2c07877b224215c92
http://api.thisismyjam.com/1/IFTFOM/followers.json?order=followedDate&key=987bcab01b929eb2c07877b224215c92
http://api.thisismyjam.com/1/IFTFOM/followers.json?order=affinity&key=987bcab01b929eb2c07877b224215c92
http://api.thisismyjam.com/1/IFTFOM/followers.json?order=name&key=987bcab01b929eb2c07877b224215c92

Same as for following, but with followers.
*/
exports.getFollowers = function (username, option, callback) {

  // 'option' is an optional argument
  if (!callback || typeof callback != "function") {
    callback = option;
    option = undefined;
  }
  
  var url = 'http://' + this.apiurl + '/' + this.apiversion + '/' + username + '/followers.json?key=' + this.apikey;
  request(url, function (error, response, body){
    return callback(error, JSON.parse(body));
  });
};

/*
Popular Jams

http://api.thisismyjam.com/1/popular.json?key=987bcab01b929eb2c07877b224215c92 

Returns the 40 most liked jams in the past 48 hours, ordered by number of likes, descending. The list is re-generated every 60 minutes. This is the same list that is used to populate http://www.thisismyjam.com/popular.
*/
exports.getPopularJams = function (callback) {
  var url = 'http://' + this.apiurl + '/' + this.apiversion + '/popular.json?key=' + this.apikey;
  request(url, function (error, response, body){
    return callback(error, JSON.parse(body));
  });
};

/*
Suggested People

http://api.thisismyjam.com/1/suggestedPeople.json?key=987bcab01b929eb2c07877b224215c92

Returns a list of TIMJ users who have many followers / have received many likes over the past three months.
*/
exports.getSuggestedPeople = function (callback) {
  var url = 'http://' + this.apiurl + '/' + this.apiversion + '/suggestedPeople.json?key=' + this.apikey;
  request(url, function (error, response, body){
    return callback(error, JSON.parse(body));
  });
};

/*
People Search

http://api.thisismyjam.com/1/search/person.json?by=name&q=institute&key=987bcab01b929eb2c07877b224215c92
http://api.thisismyjam.com/1/search/person.json?by=artist&q=beach+boys&key=987bcab01b929eb2c07877b224215c92
http://api.thisismyjam.com/1/search/person.json?by=track&q=Lana+del+Rey|Video+games&key=987bcab01b929eb2c07877b224215c92 

You can either search for people by name, artist and track. Searching by name returns people with the search string in their username, full name or Twitter name. Searching by artist returns people who have posted tracks by artists (fuzzy) matching the search string. Searching by track returns people who have posted a particular track (strict, case-insensitive matching).
*/
exports.getSearchResults = function (query, option, callback) {

  // 'option' is an optional argument
  if (!callback || typeof callback != "function") {
    callback = option;
    option = undefined;
  }
  
  var url = 'http://' + this.apiurl + '/' + this.apiversion + '/search/person.json?by=name&q=' + query + '?key=' + this.apikey;
  request(url, function (error, response, body){
    return callback(error, JSON.parse(body));
  });
};

/*
Random Jam

http://api.thisismyjam.com/1/random.json?key=987bcab01b929eb2c07877b224215c92

Returns a random jam.
*/
exports.getRandomJam = function (callback) {
  var url = 'http://' + this.apiurl + '/' + this.apiversion + '/random.json?key=' + this.apikey;
  request(url, function (error, response, body){
    return callback(error, JSON.parse(body));
  });
};

/*
Get Jam by Id

http://api.thisismyjam.com/1/jams/4cu60b7.json

Returns a specific jam.
*/
exports.getJamById = function (id, callback) {
  var url = 'http://' + this.apiurl + '/' + this.apiversion + '/jams/' + id + '.json?key=' + this.apikey;
  request(url, function (error, response, body){
    return callback(error, JSON.parse(body));
  });
};


/*
Cache stuff in the jam jar
*/
exports.jamjarSet = function (key, value) {
  jamjar[key] = value;
}


/*
Get stuff from the jam jar
*/
exports.jamjarGet = function (key) {
  if (_.isNull(jamjar[key])) {
    return jamjar[key];
  }
  else {
    return null;
  }
}