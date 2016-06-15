/**
 * Created by Administrator on 2016/5/11.
 */
angular.module("test1", []);


function UserListCtrl($scope,$http){
    $http.get('/u')
        .success(
        function(response){
            $scope.user=response;
            console.log(response);
        }

    );
}

