angular.module('wistiaUploader', [])
    .component('wistiaUploader', {
        templateUrl: './app/components/wistia-uploader/wistia-uploader.html',
        controller: function ($scope, $element, $sce) {
            var $ctrl = this;
            var uploader = $($element).find('form');
            var uploadUrl = 'https://upload.wistia.com';
            var apiPassword = '70dcf99f2899a464eeedb9cc1f4131f803b688b020030db4854f421685b5ab81';

            $ctrl.hashedId = null;

            $ctrl.$onInit = function () {
                setupUploader(uploader);
            };

            function setupUploader(uploader) {
                uploader.fileupload({
                    url: uploadUrl,
                    cache: false,
                    processData: false,
                    add: function (e, data) {
                        var fd = new FormData();
                        fd.append('api_password', apiPassword);
                        fd.append('file', data.files[0]);
                        data.formData = fd;
                        data.submit();
                    },
                    done: function (e, data) {
                        $ctrl.hashedId = data.result.hashed_id;
                        $ctrl.jsonpUrl = '//fast.wistia.com/embed/medias/' + $ctrl.hashedId + '.jsonp';
                        $ctrl.wistiaIdClass = 'wistia_async_' + $ctrl.hashedId;
                        $scope.$apply();
                    },
                    error: function (data) {
                        console.error(data);
                    }
                }).bind('fileuploadprogress', function (e, data) {
                    $ctrl.progress = (data.loaded / data.total * 100).toFixed(2);
                    $scope.$apply();
                });
            }
        }
    })