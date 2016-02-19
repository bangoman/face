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
                var y = faces[0].height/($("#mask").height()/6);
                console.log(x);
                var ctx = document.getElementById("canvas").getContext("2d");
                var img = new Image();
                img.addEventListener("load", function() {
                    ctx.drawImage(img,  $("#mask").width()/1.72 - (faces[0].width/x) - faces[0].x/x ,($("#mask").height()/3.5) - (faces[0].y/x),
                        $('#picture').width()/x, $('#picture').height()/y );
                    console.log(img);
                    console.log($("#mask").width()/1.72 - (faces[0].width/x) - faces[0].x/x);
                }, false);
                img.src = "img/face.jpg";
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