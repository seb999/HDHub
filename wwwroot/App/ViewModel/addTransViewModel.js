myApp.controller('addTransViewModel', function ($scope, $http, $uibModalInstance) {

    $scope.newItem = {};

    $scope.ok = function () {
        $scope.newItem.TransAlat = Number($scope.newAlat);
        $scope.newItem.TransAsat = Number($scope.newAsat);

        var splittedDate = $scope.newTransDate.split("/");
        $scope.newItem.TransDate = splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0]
        $uibModalInstance.close($scope.newItem);
    };

    $scope.cancel = function () {
       
        $uibModalInstance.dismiss('cancel');
    };
});
