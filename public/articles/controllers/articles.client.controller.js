'use strict';

angular.module('articles').controller('ArticlesController', ['$scope','$routeParams','$location', 'Authentication', 'Articles',
	function($scope, $routeParams, $location, Authentication, Articles){
		$scope.authentication = Authentication;

		//title and content form fields
		$scope.create = function(){
			var articles = new Articles({
				title: this.title,
				content: this.content
			});

			articles.$save(function(response){
				$location.path('articles/' + response._id);
			},
			function(errorResponse){
				$scope.error = errorResponse.data.message;
			});
		};

		//Find method
		$scope.find = function(){
			$scope.articles = Articles.query();
		};

		//Find one method
		$scope.findOne = function(){
			$scope.article = Articles.get({
				articleId: $routeParams.articleId
			});
		};

		//Edit method
		$scope.update = function(){
			$scope.article.$update(function(){
				$location.path('articles/' + $scope.article._id);
			}, function(errorResponse){
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.delete = function(article){
			if(article){
				article.$remove(function(){
					for (var i in $scope.articles){
						if($scope.articles[i] === article){
							$scope.articles.splice(i,1);
						}
					}
				});
			}else{
				$scope.article.$remove(function(){
					$location.path('articles');
				});
			}
		};
}]);