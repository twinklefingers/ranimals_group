myApp.controller('animalController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
    console.log('animalController');

    var key = '5c3c1a09b32292305d0d095f9675078f';
    var baseUrl = 'http://api.petfinder.com/';

    //set empty variable to store the random animal;
    $scope.pickAnimal = '';

    //create an array with all the animal choices with display and value;
    $scope.ranAnimals = [{
            type: '(select one)',
            value: ''
        }, {
            type: 'Barn Animals',
            value: 'barnyard'
        }, {
            type: 'Bird',
            value: 'bird'
        }, {
            type: 'Cat',
            value: 'cat'
        }, {
            type: 'Dog',
            value: 'dog'
        }, {
            type: 'Horse',
            value: 'horse'
        }, {
            type: 'Pig',
            value: 'pig'
        }, {
            type: 'Reptile',
            value: 'reptile'
        }, {
            type: 'Small & Furry',
            value: 'smallfurry'
        },

    ];

    $scope.dataFactory = DataFactory;

    //define function that will include random animal choice and query items;
    $scope.ranAn = function() {
        var query = 'pet.getRandom';
        query += '?key=' + key;
        query += '&animal=' + $scope.pickAnimal;
        query += '&output=basic';
        query += '&format=json';

        var request = baseUrl + encodeURI(query) + '&callback=JSON_CALLBACK';

        console.log(request);

        //api call;
        $http.jsonp(request).then(
            function(response) {
                console.log(response.data);
                $scope.animal = response.data.petfinder.pet;
            });
    };

    //function that will take in info and put into a object that will be sent to the server;
    $scope.addFav = function(animalId, animalType, description, image, name) {

        var favorite = {
            animalId: animalId,
            animalType: animalType,
            //used to limit the characters;
            description: description.substring(0, 99),
            image: image,
            name: name
        };
        console.log(favorite);

        $scope.dataFactory.postFav(favorite).then(function(res) {
            $scope.count = $scope.dataFactory.counter();

        })

    };

}]);

//fav controller will house the get request: where the info will show on the app;
myApp.controller('favoritesController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
    console.log('favoritesController');

    $scope.dataFactory = DataFactory;

    if ($scope.dataFactory.favorites() === undefined) {
        console.log('there is nothing here, go get it.');
        $scope.dataFactory.favoriteData().then(function(response) {
            $scope.favorites = response;
            console.log('this is what we get from the DF: ', response);
        });
    } else {
        $scope.favorites = $scope.dataFactory.favoriteData();
    }

    $scope.delete = function() {
        $http({
            method: 'DELETE',
            url: '/favorites'
        }).then(function(response) {
            console.log('response object ', response);
            $scope.count = response.data;
            console.log('count 2', $scope.count[0].count);
        });
    };
}]);

//controller for the home screen; not sure if this is necessary..
myApp.controller('homeController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
    console.log('homeController');

    $scope.dataFactory = DataFactory;
    $scope.count = 0;
    if ($scope.dataFactory.animalData() === undefined) {
        console.log('there is nothing here, go get it.');
        $scope.dataFactory.counter().then(function(response) {
            $scope.count = response;
            console.log('this is what we get from the DF: ', response);
        });
    } else {
        $scope.count = $scope.dataFactory.counter();
    }

}]);
