angular.module('redditApp',[])
	.controller('SubredditCtrl', function($scope, $http) {
		// Initialisation of Materialize elements
		$(".button-collapse").sideNav();
		$scope.postlist = [
			{"name": "George"},
			{"name": "Peter"},
			{"name": "Bob"},
			{"name": "Ahoy"}
			];
		$scope.subreddit = "Android";
		$scope.submitSubreddit = function(subreddit) {
			console.log(subreddit);
			$http({
				method: 'GET',
				url: 'https://reddit.com/r/'+ subreddit + '/hot.json',
				headers: {
					// "Authorization": 'bearer yODuzy2H75ZV2Ll0noCuUwnNx-4'
					"Accept": "application/json"
				}
			}).then(function(response){
				$scope.postlist = response;
			});
		};
	});