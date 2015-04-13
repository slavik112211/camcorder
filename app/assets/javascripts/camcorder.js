$(document).on('ready page:load', function() {
  if($('.videos.index').length == 0) return;
  if(cameraStream) cameraStream.stop();
  var mediaRecorder;

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  camcorder = document.getElementById("camcorder");
  var camcorderOptions = { audio: true, video: { mandatory: { minWidth: 1280, minHeight: 720 }}};

  if (navigator.getUserMedia) {
    navigator.getUserMedia(camcorderOptions, function(stream) {
      cameraStream = stream;
      camcorder.src = window.URL.createObjectURL(stream);
    }, function(e) { console.log('Webcamera is not connected', e); } );
  } else {
    console.log('getUserMedia() is not supported in your browser');
  }

  $("#recordButton").click(function(){
    $(this).addClass("disabled");

      mediaRecorder = new MultiStreamRecorder(cameraStream);
      mediaRecorder.mimeType = 'video/mp4';
      mediaRecorder.width = 1280;
      mediaRecorder.height = 720;
      mediaRecorder.video = camcorder; // to get maximum accuracy
      
      mediaRecorder.ondataavailable = function (blob) {
        var blobURL1 = URL.createObjectURL(blob.audio);
        var blobURL2 = URL.createObjectURL(blob.video);
        $(".videos.index").append('<a href="' + blobURL1 + '">' + blobURL1 + '</a><br/>');
        $(".videos.index").append('<a href="' + blobURL2 + '">' + blobURL2 + '</a>');
      };
      mediaRecorder.start(60 * 1000);
  });
  $("#stopButton").click(function(){
    $(this).addClass("disabled");
    mediaRecorder.stop();
  }); 

});


/*
$(".video select").change(function(e){
  $('.buttons').hide();
  $.get("clients/"+this.value+".json", function(data){
    if(data.video){

      jwplayer("media-container").setup({
          width: "600px",
          image: data.video.thumbnail,
          file: data.video.url
      });

    } else {
      var clientId = data.id;
      /*
      $("#media-container").scriptcam({ 
        width: 640,
        height: 480,
        fileName: 'uservideo',
        connected: function(){
          $('.buttons').show();
          $("#recordButton").removeClass("disabled");
          $("#stopButton").removeClass("disabled");
        },
        fileConversionStarted: function(data){
           $('.loading-indicator').show();
        },
        fileReady: function(fileUrl){
          $.ajax({ url: "videos.json", type: 'POST',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            data: {video: {client_id: clientId, url: fileUrl}},
            success: function(response) { 
              $('.loading-indicator').hide(); 
            }
          });
        }
      });


    }
  });
});*/