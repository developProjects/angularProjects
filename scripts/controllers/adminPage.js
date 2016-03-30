'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')

.controller('existingTabData', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
	var url = "http://localhost:8084/load"
	$http.get(url)
		.success(function(data) {
				var i;
				
				$scope.items = data;
			   console.log(data);
			/*Pagination*/
				$scope.pageChanged = function() {
					var begin = (($scope.currentPage - 1) * $scope.maxSize),
					end = begin + $scope.maxSize;
					$scope.items = data.slice(begin, end);
				};
				$scope.maxSize = 5;
				$scope.totalItems =  $scope.items.length;
				alert($scope.totalItems);
				$scope.currentPage = 1;            
			  
			/* Deleting the Existing Row */
				/* $scope.delete = function(id) {
					var datam = {eid : id};
		alert(id)
		var url = "http://localhost:8084/delete";
		$http({
		  url: url,
		  method: 'POST',
		  data: datam
		  
		}).success(function(data){
				//alert(data.eid);
				//alert(true)
				$window.location.reload();
				
		})
						
							
							$scope.message ="deleted";
							$scope.notificationMessage = true;
							$timeout(function(){
								$scope.notificationMessage = false;
							},5000);
							$scope.newentry = {};
							return $scope.items;
						}
					
					
				}; 
							  */
			/*Search Functionality*/                
				$scope.filterFunction = function(element) {
					return element.$.match(/^Ma/) ? true : false;
				};

			/*Add new Data*/   
				$scope.addData = function (){
					var newEntry = $scope.newentry;
					console.log(newEntry);
					var url = "http://localhost:8084/add";
					$http({
					  url: url,
					  method: 'POST',
					  data: newEntry
					  
					}).success(function(data){
					
							$window.location.reload();
							
					})
					
					
					/* $scope.message ="added";
					$scope.notificationMessage = true;
					$timeout(function(){
					$scope.notificationMessage = false;
					},4000);
					$scope.newentry={}; */
				};

			/*Reset the new Data */
				$scope.cancelEntry = function(){
					$scope.newentry={};
				};
				
			/* Update::::Save the entry */
				$scope.update =function(id){
					$scope.Toggles = {};
					for(i in $scope.items) {
						if($scope.items[i].FisherAccount == id) {
							
							$scope.AribaNetwork = $scope.items[i].AribaNetwork;
							$scope.CompanyId = $scope.items[i].CompanyId;
							$scope.Toggles.punchout = $scope.items[i].Toggles.punchout;
							$scope.Toggles.users = $scope.items[i].Toggles.users;
							$scope.Toggles.locations = $scope.items[i].Toggles.locations;
							$scope.Toggles.restrictions = $scope.items[i].Toggles.restrictions;
							$scope.Toggles.webreq = $scope.items[i].Toggles.webreq;
							$scope.Toggles.extrinsics = $scope.items[i].Toggles.extrinsics;
							$scope.FisherAccount = $scope.items[i].FisherAccount;
							$scope.FisherISACode = $scope.items[i].FisherISACode;
						}
					}
					$scope.AribaId = $scope.AribaNetwork;
					$scope.message ="updated";
					$scope.notificationMessage = true;
					$timeout(function(){
					$scope.notificationMessage = false;
					},5000);
					
					
				};
				
			/* Cancel updated entry */
				$scope.cancel = function(id) {
					for(i in $scope.items) {
						if($scope.items[i].FisherAccount == id) {
							$scope.items[i].AribaNetwork = $scope.AribaNetwork ;
							$scope.items[i].Toggles.punchout =$scope.Toggles.punchout;
							$scope.items[i].Toggles.users = $scope.Toggles.users;
							$scope.items[i].Toggles.locations = $scope.Toggles.locations  ;
							$scope.items[i].Toggles.restrictions = 	$scope.Toggles.restrictions  ;
							$scope.items[i].Toggles.webreq =$scope.Toggles.webreq;
							$scope.items[i].Toggles.extrinsics = $scope.Toggles.extrinsics;
							$scope.items[i].CompanyId = $scope.CompanyId;
							$scope.items[i].FisherAccount= $scope.FisherAccount ;
							$scope.items[i].FisherISACode =$scope.FisherISACode;
							 
						}
					}
				};

			/*Detailed update**/
				$scope.filters = {};
				$scope.showDetailedUpdateProfile = function(){
					$scope.detailedUpdate=true; 
				};	
				$scope.detailedUpdateProfile = function(){
					$scope.detailedUpdate=false; 
					$scope.filters.ariba= {};
				};
				$scope.showall = function(){
					$scope.detailedUpdate=false; 
					$scope.filters.ariba= {};
				};
		});/*success*/
}]);/*controller existingdata ends here*/

