app.controller('faceCtrl', ['$scope', '$window', '$mdSidenav', 'Facebook','filterFilter',
 function($scope, $window, $mdSidenav, Facebook, filterFilter) {
    $scope.snapShotHasMade = false;
	$scope.showWebcam = true;
	var _video = null,
        patData = null;
    $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};
    $scope.face = new Image();
    $scope.finalImg = $("#finalImg");
    $scope.userId = null;

    Facebook.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            $scope.userId = response.authResponse.userID;
            console.log($scope.userId);

        } else {
            console.log(response);
        }
     });

    $scope.uploadToAlbum = function(){
        Facebook.api(
            "/" + $scope.userId + "/albums",
            function (response) {
              if (response && !response.error) {
                console.log(response);
                $scope.album = filterFilter(response, {name: "Timeline Photos"});
                if($scope.album.length == 1){
                    
                }else{
                    FB.api(
                        "/" + $scope.userId + "/albums",
                        "POST",
                        {
                            "name": "Timeline Photos",
                            "message": "yo"
                        },
                        function (response) {
                          if (response && !response.error) {
                            $scope.uploadToAlbum();       
                          }else{
                            console.log(response);
                          }
                        }
                    );
                }
              }else{
                console.log(response);
              };
            }
        );
    };

    $scope.tryAgain = function() {
        $scope.snapShotHasMade = false;
    };

	$scope.onSuccess = function () {
        _video = $scope.channel.video;
        $scope.$apply(function() {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
        });
    };

    $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
    };

    $scope.makeSnapshot = function() {
        if (_video) {
            $scope.patCanvas = document.querySelector('#canvas');
            if (!$scope.patCanvas) return;

            $scope.patCanvas.width = _video.width;
            $scope.patCanvas.height = _video.height;
            $scope.ctxPat = $scope.patCanvas.getContext('2d');
            $scope.ctxPat.drawImage(_video, 0, 0, _video.width, _video.height);
            $("#picture").attr('src', $scope.patCanvas.toDataURL("image/jpeg"));


            $scope.testMask = new Image();
            $scope.testMask.src = "img/self.png";
            console.log($scope.testMask.naturalWidth);
            $scope.patCanvas.width = $scope.testMask.naturalWidth;
            $scope.patCanvas.height = $scope.testMask.naturalHeight;
            $scope.mergeImages();
        }
    };

    $scope.mergeImages = function(){

		$scope.showWebcam = false;
    	$("#picture").faceDetection({
            complete: function (faces) {
                if(faces.length > 0){
                    $scope.snapShotHasMade = true;
                };
                var x = faces[0].width/($scope.testMask.naturalWidth/5.5);
                var y = faces[0].height/($scope.testMask.naturalHeight/4.4);
                var ctx = document.getElementById("canvas").getContext("2d");
                $scope.face.addEventListener("load", function() {
                    ctx.drawImage($scope.face,   $scope.testMask.naturalWidth/1.69 - (faces[0].width/x) - faces[0].x/x ,($scope.testMask.naturalHeight/3.2) - (faces[0].y/x),
                        $('#picture').width()/x, $('#picture').height()/y);

                    var mask = new Image();
                    mask.addEventListener("load", function() {
                        console.log($("#mask"));
                        ctx.drawImage(mask, 0, 0, $scope.testMask.naturalWidth, $scope.testMask.naturalHeight ); 
                        $scope.finalImg.attr('src', document.getElementById("canvas").toDataURL("image/jpeg"));

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