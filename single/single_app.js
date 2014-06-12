var singleApp = angular.module('singleApp',[]);


singleApp.controller('ExerciseCtrl', function($scope,$http){
	 $http.get('exercises.json').then(function(exerciseResponse) {
			$scope.exercises = exerciseResponse.data;
			 $scope.eIndex = 0;


				$scope.next = function(){
				 if($scope.eIndex <$scope.exercises.length-1)
						$scope.eIndex++;
				};
				

				$scope.prev = function(){
				if($scope.eIndex >0)
					 $scope.eIndex--;
				};
	});
});

singleApp.controller('HistoryCtrl', function($scope,$http){
	 $http.get('history.json').then(function(historyResponse) {
			$scope.history = historyResponse.data;
	
	 });	
});

