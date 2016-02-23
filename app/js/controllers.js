app.controller('faceCtrl', ['$scope', function($scope) {
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

    
    $scope.makeSnapshot = function() {
        if (_video) {
            console.log("_video = ", _video);
            $scope.patCanvas = document.querySelector('#canvasDemo');
            if (!$scope.patCanvas) return;

            $scope.patCanvas.width = _video.width;
            $scope.patCanvas.height = _video.height;
            $scope.ctxPat = $scope.patCanvas.getContext('2d');
            $scope.ctxPat.drawImage(_video, 0, 0, _video.width, _video.height);
            $("#picture").attr('src', $scope.patCanvas.toDataURL("image/jpeg"));
            $scope.srcTest = $("#picture").src;
            console.log("$scope.srcTest = ", $scope.srcTest);
            setTimeout(function () {
                console.log("#picture = ",  $scope.patCanvas.toDataURL("image/jpeg"));
                setTimeout(function () {
                    $scope.mergeImages();
                }, 30);
            },30 );
            console.log($scope.face);
        }
    };

    $scope.mergeImages = function(){
		$scope.showWebcam = false;
        console.log($('#picture').src, $scope.srcTest);
    	$("#picture").faceDetection({
            complete: function (faces) {
                console.log(faces[0]);
                var x = faces[0].width/($("#mask").width()/5.5);
                var y = faces[0].height/($("#mask").height()/4.4);
                console.log(x);
                var ctx = document.getElementById("canvas").getContext("2d");
                $scope.face.addEventListener("load", function() {
                    console.log($scope.face);
                    ctx.drawImage($scope.face,   $("#mask").width()/1.69 - (faces[0].width/x) - faces[0].x/x ,($("#mask").height()/3.2) - (faces[0].y/x),
                        $('#picture').width()/x, $('#picture').height()/y);

                    var mask = new Image();
                    mask.addEventListener("load", function() {
                        ctx.drawImage(mask, 0, 0, $("#mask").width(), $("#mask").height() );                        
                    }, false);
                    mask.src = "img/self.png";    
                }, false);
                $scope.face.src = $('#picture').attr('src'); 
            },
            error:function (code, message) {
                alert('Error: ' + message);
            }
        });
    };

}]);