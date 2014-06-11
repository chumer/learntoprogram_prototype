/**
 * Created by gergo on 10/06/14.
 */

function multiController($scope){
  $scope.totalTodos = 3;

  $scope.excercises = ["TextOfe1dksfksdl;fjsld;fdsk;fjdsf;kds", "Textofe2msenfkldklfl'glrkgl;'fds'lgkf", "TextOfe2ksdfkldjkglf;djsk;fgjds;flg"]
  $scope.eIndex = 0;


	$scope.next = function(){
	 if($scope.eIndex >0)
			$scope.eIndex--;
	}

	$scope.prev = function(){
	if($scope.eIndex <2)
		 $scope.eIndex++;
	}
}