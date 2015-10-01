angular.module('redditApp',[])
	.controller('SubredditCtrl', function($scope, $http) {
		// Initialisation of Materialize elements
		$(".button-collapse").sideNav();

		$scope.posts = undefined;
		$scope.subreddit = "Android";
		$scope.subredditinfo = [];

		$http({
			method: 'GET',
			url: 'https://www.reddit.com/r/'+ $scope.subreddit + '/hot.json',
			headers: {
				// "Authorization": 'bearer yODuzy2H75ZV2Ll0noCuUwnNx-4',
				// "Access-Control-Allow-Origin": "*",
				// "Accept": "application/x-www-form-urlencoded"
			}
		}).then(function(response){
				$scope.postlist = response;
				$scope.posts = $scope.postlist.data.data.children;
				console.log(response);
				console.log($scope.posts);
		});
		
		$scope.submitSubreddit = function(subreddit) {
			console.log(subreddit);
			$http({
				method: 'GET',
				url: 'https://www.reddit.com/r/'+ subreddit + '/hot.json',
				headers: {
					// "Authorization": 'bearer yODuzy2H75ZV2Ll0noCuUwnNx-4',
					// "Access-Control-Allow-Origin": "*",
					// "Accept": "application/x-www-form-urlencoded"
				}
			}).then(function(response){
				$scope.subredditinfo = response;
				$scope.posts = $scope.subredditinfo.data.data.children;
				console.log(response);
				console.log($scope.posts);
			});
		};

		$scope.openPost = function(postID) {
			$scope.selectedPostID = postID;
			

		};
	});