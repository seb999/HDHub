myApp.controller('addVirusLoadViewModel', function ($scope, $http, $uibModalInstance) {

    $scope.newItem = {};

    $scope.ok = function () {
        $scope.newItem.VirusLoadValue = Number($scope.newVirusLoad);

        var splittedDate = $scope.newVirusLoadDate.split("/");
        $scope.newItem.VirusLoadDate = splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0]
        $uibModalInstance.close($scope.newItem);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
