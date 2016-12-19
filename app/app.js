var app = angular.module('app', [
    'wistiaUploader'
]);
app.directive('dynamicSrc', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe('dynamic-src', function (newVal) {
                if (newVal) {
                    attrs.$set('src', newVal)
                }
            })
        }
    }
});
