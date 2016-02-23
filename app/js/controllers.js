app.controller('faceCtrl', ['$scope', '$window', '$mdSidenav', 'Facebook',
 function($scope, $window, $mdSidenav, Facebook) {
    $scope.showResults = false;
	$scope.showWebcam = true;
	var _video = null,
        patData = null;
    $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};
    $scope.face = new Image();
	$scope.onSuccess = function () {
        _video = $scope.channel.video;
        $scope.$apply(function() {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
        });
    };

   $scope.login = function () {
        Facebook.login(function(response) {
            if (response.status == 'connected') {
                $scope.connected = true;
            } else {
                $scope.connected = false;
            }
        });
    };

    (function() {
                var e = document.createElement('script'); e.async = true;
                e.src = document.location.protocol +
                    '//connect.facebook.net/en_US/all.js';
                document.getElementById('fb-root').appendChild(e);
            }());

    $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
    };

    $scope.makeSnapshot = function() {
        $scope.showResults = true;
        if (_video) {
            $scope.patCanvas = document.querySelector('#canvas');
            if (!$scope.patCanvas) return;

            $scope.patCanvas.width = _video.width;
            $scope.patCanvas.height = _video.height;
            $scope.ctxPat = $scope.patCanvas.getContext('2d');
            $scope.ctxPat.drawImage(_video, 0, 0, _video.width, _video.height);
            $("#picture").attr('src', $scope.patCanvas.toDataURL("image/jpeg"));

            $scope.patCanvas.width = 1000;
            $scope.patCanvas.height = 1000;
            $scope.srcTest = $("#picture").src;
            $scope.mergeImages();
        }
    };

    $scope.mergeImages = function(){
		$scope.showWebcam = false;
    	$("#picture").faceDetection({
            complete: function (faces) {
                var x = faces[0].width/($("#mask").width()/5.5);
                var y = faces[0].height/($("#mask").height()/4.4);
                var ctx = document.getElementById("canvas").getContext("2d");
                $scope.face.addEventListener("load", function() {
                    ctx.drawImage($scope.face,   $("#mask").width()/1.69 - (faces[0].width/x) - faces[0].x/x ,($("#mask").height()/3.2) - (faces[0].y/x),
                        $('#picture').width()/x, $('#picture').height()/y);

                    var mask = new Image();
                    mask.addEventListener("load", function() {
                        console.log($("#mask"));
                        ctx.drawImage(mask, 0, 0, $("#mask").width(), $("#mask").height() );                        
                    }, false);
                    mask.src = "img/self.png";    
                }, false);
                $scope.face.src = $('#picture').attr('src'); 
            },
            error:function (code, message) {
                alert("please put your head in front of the camera");
            }
        });
    };

}]);