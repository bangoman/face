app.controller('faceCtrl', ['$scope', function($scope) {
	$scope.showWebcam = true;
	var _video = null,
        patData = null;
    $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};
    $scope.face = new Image();
	$scope.onSuccess = function () {
        // The video element contains the captured camera data
        _video = $scope.channel.video;
        $scope.$apply(function() {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
            //$scope.showDemos = true;
        });
    };

    
    $scope.makeSnapshot = function() {
        if (_video) {
            $scope.patCanvas = document.querySelector('#canvasDemo');
            if (!$scope.patCanvas) return;

            $scope.patCanvas.width = _video.width;
            $scope.patCanvas.height = _video.height;
            $scope.ctxPat = $scope.patCanvas.getContext('2d');
            $scope.ctxPat.drawImage(_video, 0, 0, _video.width, _video.height);
            //var idata = $scope.getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            //ctxPat.putImageData(idata, 0, 0);

            $("#picture").src = $scope.patCanvas.toDataURL();
            $scope.ctx = document.getElementById('canvas').getContext('2d');
            $scope.ctx.drawImage($scope.face, 0, 0, _video.width, _video.height);
            console.log($scope.face);
            $scope.mergeImages();
            //patData = idata;
        }
    };

    $scope.mergeImages = function(){
		$scope.showWebcam = false;
    	$('#picture').faceDetection({
            complete: function (faces) {
                console.log(faces[0]);
                var x = faces[0].width/($("#mask").width()/6);
                var y = faces[0].height/($("#mask").height()/4.5);
                console.log(x);
                var ctx = document.getElementById("canvas").getContext("2d");
                var face = new Image();
                face.addEventListener("load", function() {
                    console.log(face);
                    ctx.drawImage(face,   $("#mask").width()/1.72 - (faces[0].width/x) - faces[0].x/x ,($("#mask").height()/3.5) - (faces[0].y/x),
                        $('#picture').width()/x, $('#picture').height()/y);

                    var mask = new Image();
                    mask.addEventListener("load", function() {
                        ctx.drawImage(mask, 0, 0, $("#mask").width(), $("#mask").height() );                        
                    }, false);
                    mask.src = "img/self.png";    
                }, false);
                $('#picture')[0] = face;
                face.src = $("#picture").attr('src'); 
         //       $('#picture').width($('#picture').width() / x)
           //     $("#picture").css({top:($("#mask").height()/3.5) - (faces[0].y/x), left: $("#mask").width()/1.72 - (faces[0].width/x) - faces[0].x/x  + "px"});
                //ctx.drawImage(img, 90, 130, 50, 60, 10, 10, 50, 60); 

            },
            error:function (code, message) {
                alert('Error: ' + message);
            }
        });
    };

}]);