// Code goes here
(function () {

    var app = angular.module("gitHubViewer", []);

    var MainController = function ($scope, $http, $interval) {

        var onUserComplete = function (response) {

            $scope.user = response.data;

            $http.get($scope.user.repos_url)
                .then(onRepos)

        };

        var onRepos = function (response) {

            $scope.repos = response.data;

        };

        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };

        var startCountdown = function () {
            $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search = function (username) {

            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete);

        };

        $scope.username = "angular";

        $scope.message = "GitHub Viewer";

        $scope.repoSortOrder = "-stargazers_count";

        $scope.countdown = 5;

        startCountdown();

    };

    app.controller("MainController", ["$scope", "$http", "$interval"]);

}());