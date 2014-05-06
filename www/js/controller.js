angular.module('starter.controllers', [])

.controller('MainCtrl', ['$scope','$http', function($scope, $http){
	$scope.title = "AAAAAAAAAA";
	
	$scope.reloadPage = function(){
		location.reload();
	};
	
	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'http%3A%2F%2Fwww.inilahkoran.com%2Frss'&format=json&diagnostics=true&callback=JSON_CALLBACK";

	$http.jsonp(url).
			success(function(data, status, headers, config) {
				var feeds;
				var itemDesc, itemImg;
				feeds = {
					items: data.query.results.item
				};

				for(var i = 0; i < feeds.items.length;i++){
					itemDesc = feeds.items[i].description.replace(/<img([\w\W]+?)>/g,"");
					itemImg = feeds.items[i].description.match(/http:(.+)\?*.jpg/)[0].toString();
					feeds.items[i].description = itemDesc;
					feeds.items[i].img = itemImg;
				}
				$scope.feed = feeds;
				console.log($scope.feed.items[1].description);
				console.log($scope.feed.items[1].img);


			})
			.error(function(data, status, headers, config) {
				console.log('Error fetching feed:', data);
			});
}])
