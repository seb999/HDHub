myApp.controller('vhbViewModel', function ($scope, $http, $uibModal, $timeout) {

$scope.chartType = 'linear';

//-------------TRANSAMINASES ACTION----------------

//Function : Load Transaminase data
var getTransData = function () {
    $http({
        method: 'GET',
        url: 'api/Trans'
    }).then(function successCallback(response) {
        $scope.transData = response.data;
        $scope.drawTransaminaseChart(response.data); 
    }, function errorCallback(response) {
    });
};

//Command : Delete transaminase
$scope.trashTrans = function (id) {
    $http({
        url: "api/Trans/" + id,
        method: "DELETE",
    }).then(function successCallback(response) {
        getTransData();
    }, function errorCallback(response) {
    });
};

//Command : Add transaminases
$scope.commandAddNewTrans = function () {
    var modalInstance = $uibModal.open({
        templateUrl: 'App/View/addTrans.html',
        controller: 'addTransViewModel',
        size: 'sm',
        cache: false,
        resolve: {}
    });
    modalInstance.result.then(function (newItem) {
        $http({
            url: 'api/trans',
            method: "POST",
            data: JSON.stringify(newItem),
            headers: { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            getTransData();
        }, function errorCallback(response) {
        });
    });
};

//-------------VIRUS LOAD ACTION----------------

//Function : Load Virus load data
var getVirusLoadData = function () {
    $http({
        method: 'GET',
        url: 'api/VirusLoad'
    }).then(function successCallback(response) {
        $scope.virusLoadData = response.data;
        $scope.drawChartVirusLoad(response.data);
    }, function errorCallback(response) {
    });
};

//Command : Delete virus load
$scope.trashVirusLoad = function (id) {
    $http({
        url: "api/VirusLoad/" + id,
        method: "DELETE",
    }).then(function successCallback(response) {
        getVirusLoadData();
    }, function errorCallback(response) {
    });
};

//Command : Add virus load
$scope.commandAddNewVirusLoad = function () {
    var modalInstance = $uibModal.open({
        templateUrl: 'App/View/addVirusLoad.html',
        controller: 'addVirusLoadViewModel',
        size: 'sm',
        cache: false,
        resolve: {}
    });
    modalInstance.result.then(function (newItem) {
        $http({
            url: 'api/virusLoad',
            method: "POST",
            data: JSON.stringify(newItem),
            headers: { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            getVirusLoadData();
        }, function errorCallback(response) {
        });
    });
};

//-------------CHARTS ----------------  
$scope.chartConfigTransaminase = {
    title: {
        text: ' '
    },
    series: [],
    useHighStocks: true,
    options: {
        chart: {
            type: 'spline',
            title: 'UI/L',
            zoomType: 'x'
        },
        rangeSelector: {
            enabled: false
        },
        navigator: {
            enabled: true
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            },
            minTickInterval: 5,
            minorTickInterval: 1
        },
        yAxis: {
            title: {
                text: 'UI/ml'
            },
            plotLines: [{
                value: 40,
                color: 'red',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: 'ALAT (TGP) Max',
                    style: {
                        color: '#FF0000'
                    }
                }
            },
            {
                value: 34,
                color: 'blue',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: 'ASAT (TGO) Max',
                    style: {
                        color: 'blue'
                    }
                }
            }
            ],
            minorGridLineWidth: 0,
            minorTickInterval: 'auto',
            minorTickColor: '#000000',
            minorTickWidth: 1,
            minorTickLength: 3,
            minorTickPosition: 'inside',
            minorGridLineColor: '#F0F0F0',
            minorGridLineWidth: 1,
        },
        tooltip: {
            headerFormat: '{point.x:%d/%m/%Y}<br/>',
            pointFormat: '{series.name}: <b>{point.y} UI/ml</b>'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }],
        legend: {
            enabled: true
        },
    },
};

//Function : draw virus load chart
$scope.drawTransaminaseChart = function () {   
    var transAlatArray = [];
    var transAsatArray = [];
    for (var i = 0; i < $scope.transData.length; i++) {
        transAlatArray.push([$scope.transData[i].transDateUtc, $scope.transData[i].transAlat]);
        transAsatArray.push([$scope.transData[i].transDateUtc, $scope.transData[i].transAsat]);
    }
    $scope.chartConfigTransaminase.series.push({
    
        id: 'Asat',
        name: 'ASAT (TGO)',
        lineWidth: 1,
        marker: {
                enabled: true,
                radius: 2
            },
        data: transAsatArray,
    });
    $scope.chartConfigTransaminase.series.push({
        id: 'Alat',
        name: 'ALAT (TGP)',
        marker: {
                enabled: true,
                radius: 2
            },
        lineWidth: 1,
        data: transAlatArray,
    });
};

//Function : draw virus load chart
$scope.drawChartVirusLoad = function () {

$scope.chartConfigVirusLoad = {
    title: {
        text: ' '
    },
    series: [],
    useHighStocks: true,
    options: {
        chart: {
            type: 'line',
            zoomType: 'x'
        },
        rangeSelector: {
            enabled: false
        },
        navigator: {
            enabled: true
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            },
            minTickInterval: 5,
            minorTickInterval: 1
        },
        yAxis: {
            title: {
                text: 'UI/L'
            },
            type: $scope.chartType,
            minorGridLineWidth: 0,
            minorTickInterval: 'auto',
            minorTickColor: '#000000',
            minorTickWidth: 1,
            minorTickLength: 3,
            minorTickPosition: 'inside',
            minorGridLineColor: '#F0F0F0',
            minorGridLineWidth: 1,
        },
        tooltip: {
            headerFormat: '{point.x:%d/%m/%Y}<br/>',
            pointFormat: 'Virus load: <b>{point.y} UI/ml</b>'
        },
    },
};
    $scope.chartConfigVirusLoad.series = [];
    var virusLoadArray = [];
    for (var i = 0; i < $scope.virusLoadData.length; i++) {
        virusLoadArray.push([$scope.virusLoadData[i].virusLoadDateUtc, $scope.virusLoadData[i].virusLoadValue]);
    }
    $scope.chartConfigVirusLoad.series.push({
        data: virusLoadArray,
        lineWidth: 1,
        marker: {
                enabled: true,
                radius: 2
            },
        type: 'spline',
        fillColor: {
        linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
        },
        stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
        ]
    },
    });
};

$scope.setChartLinear = function () {
    $scope.chartType = 'linear';
    $scope.drawChartVirusLoad();
}

$scope.setChartLog = function () {

    $scope.chartType = 'logarithmic';
    $scope.drawChartVirusLoad();
}

$scope.reDrawChart = function () {
    $timeout(function () {
        $scope.chartConfigVirusLoad;
    }, 1000);
}

getTransData();
getVirusLoadData();
   
});

