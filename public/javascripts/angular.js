var app = angular.module("myApp", ['ngYoutubeEmbed']);
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});
app.controller('myCtrl', function($scope,$http,$window) {
    $http({
        method: 'GET',
        url: '/api/getpatients'
    }).then(function (response){
        $scope.patients = response.data.patients;
    },function (error){
        console.error('Response error', status, data);
    });
$scope.openPatients = function (value) {
    $window.location.href = "/patient/"+value;
}
    
    
});

app.controller('videoCtrl', ['$scope','$http','$window', function($scope,$http,$window) {
    $http({
        method: 'GET',
        url: '/video-list'
    }).then(function (response){
        $scope.videos = response.data.videos;
    },function (error){
        console.error('Response error', status, data);
    });
    
    $scope.deleteVideo = function (video) {
        $http({
            method: 'delete',
            url: '/video',
            headers: {
                'Content-Type': "application/json"
            },
            data: { video: video }
        }).then(function (response){
            $window.location.href = "/video";
        },function (error){
            console.error('Response error', status, data);
        });
    }
}]);

app.controller('alertController',function ($scope,$http,$log) {
    $http({
        method: 'GET',
        url: '/api/getpatients'
    }).then(function (response){
        var alerts = [];
        for(var i=0;i<response.data.patients.length;i++) {
            for(j=0;j<response.data.patients[i].alerts.length;j++)
            {
                alerts.push(response.data.patients[i].alerts[j]);
            }

        }
        $scope.alerts = alerts;
    },function (error){
        console.error('Response error', status, data);
    });
    $scope.openPatients = function (value) {
        $window.location.href = "/patient/"+value;
    }

})

app.controller('signController',function ($scope) {

        $scope.signSubmit = function () {
            var i = 0;
            if($scope.bitten){
                alert("You have been bitten by an animal please seek medical attention");
                i++;
            }
            if($scope.breathing)
            {
                alert("you having trouble breathing please seek medical attention");
                i++;
            }
            if($scope.coughingmore)
            {
                alert("you have been coughing for more than a week please seek medical attention");
                i++;
            }
            if($scope.headache)
            {
                alert("You have severe headache with fever please seek medical attention");
                i++;
            }
            if($scope.rash)
            {
                alert("You experience a rash or swelling please seek medical attention");
                i++;
            }
            if($scope.prolonged)
            {
                alert("You have unexplained or prolonged fever please seek medical attention");
                i++;
            }
            if($scope.vision)
            {
                alert("You have sudden vision problems please seek medical attention");
                i++;
            }
            if(!i>0)
            {
                alert("You are safe not need to visit");
            }

        };



})