angular.module('redditApp',['angularMoment'])
	.controller('SubredditCtrl', function($scope, $http) {
		// Initialisation of Materialize elements
		$(".button-collapse").sideNav();
		$(document).ready(function(){
			$('.materialboxed').materialbox();
		});

		$scope.posts = undefined;
		$scope.subreddit = "all";
		$scope.subredditinfo = [];
		$scope.favourites = [{"name": "CitiesSkylines"}, {"name": "Anime"}, {"name": "LeagueOfLegends"}, {"name": "Android"}, {"name": "StardewValley"}, {"name": "NoMansSkyTheGame"}, {"name": "WorldNews"}, {"name": "AskReddit"}]
		
		$scope.submitSubreddit = function(subreddit) {
			$scope.subreddit = subreddit;
			console.log(subreddit);
			$scope.loadingSelectedPost = true;
			$http({
				method: 'GET',
				url: 'https://www.reddit.com/r/'+ subreddit + '/hot.json',
				headers: {
					// "Authorization": 'bearer yODuzy2H75ZV2Ll0noCuUwnNx-4',
					// "Access-Control-Allow-Origin": "*",
					// "Accept": "application/x-www-form-urlencoded"
				}
			}).then(function(response){
				$scope.loadingSelectedPost = false;
				$scope.subredditinfo = response;
				$scope.posts = $scope.subredditinfo.data.data.children;
				console.log(response);
				console.log($scope.posts);
			});
		};

		$scope.submitSubreddit($scope.subreddit);
		$scope.loadingSelectedPost = false;
		$scope.hide = true;
		$scope.hide2 = true;
		$scope.hide3 = false;
		$scope.hide4 = false;

		$scope.openPost = function(postID) {
			$scope.selectedPostID = postID;
			$scope.loadingSelectedPost = true;
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
				$scope.loadingSelectedPost = false;
				$scope.selectedPostDetails = response;
				console.log(response);
				$scope.selectedPostOriginalPost = $scope.selectedPostDetails.data[0].data.children[0].data;
				console.log($scope.selectedPostOriginalPost.selftext);
				$scope.selectedPostComments = $scope.selectedPostDetails.data[1].data.children;
				console.log($scope.selectedPostComments);
			});
		};
	});