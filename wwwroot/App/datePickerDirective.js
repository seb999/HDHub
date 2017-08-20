myApp.directive('datePickerDirective', function () {

    return {
        restrict: 'AE', //Restricted to attribut and element
        template: '<div>This is my directive</div>',
        replace: false,
        link: function (scope, element, attrs, ngModelCtrl) {
            $(element).datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,

                onSelect: function (date) {
                    var ngModelName = this.attributes['ng-model'].value;

                    // if value for the specified ngModel is a property of 
                    // another object on the scope
                    if (ngModelName.indexOf(".") != -1) {
                        var objAttributes = ngModelName.split(".");
                        var lastAttribute = objAttributes.pop();
                        var partialObjString = objAttributes.join(".");
                        var partialObj = eval("scope." + partialObjString);

                        partialObj[lastAttribute] = date;
                    }
                        // if value for the specified ngModel is directly on the scope
                    else {
                        scope[ngModelName] = date;
                    }
                    scope.$apply();
                }
            });
        }
    }
});