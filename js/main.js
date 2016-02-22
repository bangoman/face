 function take_snapshot() {
    Webcam.snap( function(data_uri) {
        // display results in page
     //   $("#picture").attr("src", data_uri);   
        $("#mergeContainer").css("visibility", "hidden");    
        $("#canvas").css("visibility", "visible");
        $("#my_camera").css("visibility", "hidden");
        $('#picture').faceDetection({
            complete: function (faces) {
                console.log(faces);
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
                face.src = "img/face3.jpg";
         //       $('#picture').width($('#picture').width() / x)
           //     $("#picture").css({top:($("#mask").height()/3.5) - (faces[0].y/x), left: $("#mask").width()/1.72 - (faces[0].width/x) - faces[0].x/x  + "px"});
                //ctx.drawImage(img, 90, 130, 50, 60, 10, 10, 50, 60); 

            },
            error:function (code, message) {
                alert('Error: ' + message);
            }
        });

    });
}

$(document).ready(function(){

    Webcam.set({
        dest_width: 1280,
        dest_height: 720,
        image_format: 'jpeg',
        jpeg_quality: 100
    });
    Webcam.attach( '#my_camera' );
});