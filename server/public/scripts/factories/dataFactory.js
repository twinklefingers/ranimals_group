myApp.factory('DataFactory', ['$http', function($http){
//secret stuff;
var favCount = undefined;
var favAnimals = undefined;

var updateCount = function (){
  console.log('DF getting count from server');
  var promise = $http.get('/favorites/count').then(function (response){
    favCount = response.data;
    console.log('favCount is:', favCount);
    return favCount;
  });
  console.log('promise is:', promise);
  return promise;
};

var getFavs = function () {
  console.log('DF getting favs from server');
  var favPromise = $http.get('/favorites/favorite').then(function (response) {
      console.log('DF response of fav animals: ', response);
      favAnimals = response.data;
      console.log('favorites: ', favAnimals);
      return favAnimals;
    });
    return favPromise;
}

var addFav = function (favorite) {
  console.log("this is Favorite: ", favorite);
  var addPromise = $http.post('/favorites', favorite).then(function(response){
    console.log("Response", response);
    console.log('DF post complete!');
    return updateCount();
  });
  return addPromise;
}

//stuff to controllers;
return{
  counter: function (){
    return updateCount();
  },
  favorites: function (){
    return getFavs();
  },
  animalData: function(){
    return favCount;
  },
  favoriteData: function() {
    return favAnimals;
  },
  postFav: function(favorite){
    return addFav(favorite);
  }

}

}]);
