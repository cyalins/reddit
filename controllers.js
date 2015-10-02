angular.module('redditApp',[])
	.controller('SubredditCtrl', function($scope, $http) {
		// Initialisation of Materialize elements
		$(".button-collapse").sideNav();
		$(document).ready(function(){
			$('.materialboxed').materialbox();
		});

		$scope.posts = undefined;
		$scope.subreddit = "all";
		$scope.subredditinfo = [];
		
		$scope.submitSubreddit = function(subreddit) {
			console.log(subreddit);
			$http({
				method: 'GET',
				url: 'https://www.reddit.com/r/'+ $scope.subreddit + '/hot.json',
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

		$scope.submitSubreddit();

		$scope.openPost = function(postID) {
			$scope.selectedPostID = postID;
			console.log($scope.selectedPostID);
			$http({
				method: 'GET',
				url: 'https://www.reddit.com/r/'+ $scope.subreddit + '/' + $scope.selectedPostID + '.json',
				headers: {
					// "Authorization": 'bearer yODuzy2H75ZV2Ll0noCuUwnNx-4',
					// "Access-Control-Allow-Origin": "*",
					// "Accept": "application/x-www-form-urlencoded"
				}
			}).then(function(response){
				$scope.selectedPostDetails = response;
				console.log(response);
				$scope.selectedPostOriginalPost = $scope.selectedPostDetails.data[0].data.children[0].data;
				console.log($scope.selectedPostOriginalPost.selftext);
			});
		};
	});