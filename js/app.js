var myApp = angular.module('myApp',[]);


myApp.controller('mainController',function($scope,$timeout){
	$scope.hidden_words = [];

	$scope.get_all = function(callback){
		chrome.storage.sync.get("banned_words2",function(data){
			$scope.hidden_words = (data.banned_words2) ? data.banned_words2 : [];
			if(callback) callback();
		});
	}
	$scope.get_all();
	$timeout(function(){ 
		$scope.get_all() 
	},500);	

	$scope.save_words = function(){
		chrome.storage.sync.set({'banned_words2': $scope.hidden_words }, function() {
        });	
   	}

	$scope.add_new_word = function(){
		$scope.hidden_words.push($scope.new_word.trim());
		$scope.hidden_words = array_unique($scope.hidden_words);
		$scope.save_words();
		$scope.new_word = "";
	}
	$scope.remove_hidden_word = function(index){
		out = $scope.hidden_words.splice(index,1);
		$scope.save_words();
	}

});




function array_unique(array){ 
	var nuique = array.filter(function(value,index,self){
		return self.indexOf(value) == index;
	});
	return nuique;
}





